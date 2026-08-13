/**
 * Geometry helpers for floating overlays — dropdown menus, tooltips, and
 * popovers — that render as `position: fixed` so they escape a clipping or
 * scrolling ancestor (e.g. a dialog body) and "appear on top".
 *
 * This class is a verbatim extraction of the suggestion-dropdown's own
 * placement math (`legacy-tag-field`): the same containing-block lookup, the
 * same prefer-below-then-flip rule, and the same coordinate computation. The
 * tooltip is the first consumer; the Tag/Role dropdowns will be migrated onto
 * it next so the calculation lives in exactly one place.
 */

/** Vertical side a floating overlay opens toward, relative to its anchor. */
export type ViewportPlacement = 'top' | 'bottom';

/** Tuning knobs for the placement + position calculation. */
export interface ViewportPlacementOptions {
  /** Pixel gap between the anchor and the overlay. Defaults to 6. */
  gap?: number;
  /**
   * Cap (px) on how much room-below counts as "enough" before the overlay is
   * allowed to flip above. Mirrors the dropdown's 160px preference.
   */
  preferredHeightCap?: number;
}

/** A computed fixed-overlay position, relative to its containing block. */
export interface ViewportOverlayPosition {
  /** Left offset, px, relative to the containing block (or viewport). */
  left: number;
  /** Top offset, px, relative to the containing block (or viewport). */
  top: number;
}

/** Arguments for {@link ViewportMetrics.overlayPosition}. */
export interface ViewportOverlayPositionArgs {
  /** The anchor (trigger) bounding rect, in viewport coordinates. */
  anchorRect: DOMRect;
  /** The overlay's measured height, px. */
  overlayHeight: number;
  /** Which side the overlay opens toward. */
  placement: ViewportPlacement;
  /** The containing-block rect from {@link ViewportMetrics.containingBlockRect}. */
  containingBlockRect: DOMRect | null;
  /** Pixel gap between the anchor and the overlay. Defaults to 6. */
  gap?: number;
}

/**
 * Static geometry helpers shared by every `position: fixed` floating overlay.
 */
export class ViewportMetrics {
  /** Default gap between an anchor and its overlay, px. */
  static readonly DEFAULT_GAP = 6;

  /** Default cap on the "prefer below" height, px. */
  static readonly DEFAULT_PREFERRED_HEIGHT_CAP = 160;

  /**
   * Finds the nearest ancestor of `fromElement` that establishes a containing
   * block for `position: fixed` descendants — any ancestor carrying a
   * transform, perspective, filter, or backdrop-filter. A fixed overlay
   * resolves its coordinates against this box (NOT the viewport), so its
   * `left`/`top` must be expressed relative to the returned rect. Returns
   * `null` when the viewport itself is the containing block.
   */
  static containingBlockRect(fromElement: Element | null): DOMRect | null {
    let element: Element | null = fromElement?.parentElement ?? null;

    while (element && element !== document.body) {
      const style = window.getComputedStyle(element);
      if (
        style.transform !== 'none'
        || style.perspective !== 'none'
        || style.filter !== 'none'
        || style.backdropFilter !== 'none'
      ) {
        return element.getBoundingClientRect();
      }
      element = element.parentElement;
    }

    return null;
  }

  /**
   * Chooses whether an overlay of `overlayHeight` should open below
   * (`'bottom'`) or above (`'top'`) the anchor, preferring below unless there
   * is clearly more room above. Mirrors the dropdown's rule exactly.
   */
  static verticalPlacement(
    anchorRect: DOMRect,
    overlayHeight: number,
    options: ViewportPlacementOptions = {},
  ): ViewportPlacement {
    const gap = options.gap ?? ViewportMetrics.DEFAULT_GAP;
    const cap =
      options.preferredHeightCap
      ?? ViewportMetrics.DEFAULT_PREFERRED_HEIGHT_CAP;
    const preferredBelowHeight = Math.min(overlayHeight + gap, cap);
    const availableAbove = anchorRect.top;
    const availableBelow = window.innerHeight - anchorRect.bottom;

    return availableBelow >= preferredBelowHeight
      || availableBelow >= availableAbove
      ? 'bottom'
      : 'top';
  }

  /**
   * Computes the fixed-overlay coordinates for the chosen `placement`,
   * expressed relative to `containingBlockRect` (or the viewport when `null`).
   * Mirrors the dropdown's `menuStyle`: the overlay left-aligns with the
   * anchor and offsets vertically by `gap`, clamping a top placement to 0.
   */
  static overlayPosition(
    args: ViewportOverlayPositionArgs,
  ): ViewportOverlayPosition {
    const gap = args.gap ?? ViewportMetrics.DEFAULT_GAP;
    const parent = args.containingBlockRect;

    const left = parent
      ? args.anchorRect.left - parent.left
      : args.anchorRect.left;

    const top =
      args.placement === 'top'
        ? Math.max(
            (parent ? args.anchorRect.top - parent.top : args.anchorRect.top)
              - args.overlayHeight
              - gap,
            0,
          )
        : (parent
            ? args.anchorRect.bottom - parent.top
            : args.anchorRect.bottom) + gap;

    return { left, top };
  }
}
