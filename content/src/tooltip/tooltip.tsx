import * as React from 'react';
import type { CSSProperties, ReactElement } from 'react';

import {
  ViewportMetrics,
  type ViewportPlacement,
} from 'shared/public/components/viewport-metrics';

/** Describes props accepted by Tooltip. */
export class TooltipProps {
  /** Wires the panel into `aria-describedby` on the trigger. */
  id!: string;
  /** Drives the tooltip heading shown above the optional description. */
  title!: React.ReactNode;
  /** Drives the optional supporting copy shown below the title. */
  description?: React.ReactNode;
  /** Wraps the trigger that anchors the tooltip overlay. */
  children?: React.ReactNode;
  /** Lets keyboard focus open the tooltip in addition to hover. */
  showOnFocus?: boolean = true;
  /**
   * Makes the open panel interactive (pointer-events + text selection) so the
   * user can move into it and select/copy its content instead of the panel
   * ignoring the pointer. Off by default so plain hint tooltips stay
   * click-through.
   */
  selectable?: boolean = false;
}

/** Mutable placement state for the anchored tooltip shell. */
class TooltipState {
  /**
   * Side the tooltip opens toward, chosen by {@link ViewportMetrics}. The
   * tooltip renders `position: fixed` (like the suggestion dropdown) so a
   * clipping/scrolling ancestor — a dialog body — can no longer cut it off.
   */
  placement: ViewportPlacement = 'bottom';

  /** Computed fixed coordinates, or `null` until the first measurement. */
  position: { left: number; top: number } | null = null;

  /** Horizontal pointer offset that keeps the arrow centered on the trigger. */
  arrowOffset = 0;
}

/** Renders the anchored tooltip shell. */
export class Tooltip extends React.Component<TooltipProps> {
  /** Backs callers that omit optional props with sensible defaults. */
  static defaultProps = new TooltipProps();

  /** Anchors placement math against the trigger's bounding rect. */
  private readonly anchorRef = React.createRef<HTMLDivElement>();

  /** Lets placement math measure the floating tooltip panel. */
  private readonly tooltipRef = React.createRef<HTMLDivElement>();

  /** Tracks the chosen placement, coordinates, and arrow offset. */
  state = new TooltipState();

  /** Recalculates placement after the tooltip first mounts. */
  componentDidMount(): void {
    window.addEventListener('resize', this.handleViewportChange);
    window.addEventListener('scroll', this.handleViewportChange, true);
    this.updatePlacement();
  }

  /** Recalculates placement when tooltip content or anchor size may shift. */
  componentDidUpdate(): void {
    this.updatePlacement();
  }

  /** Removes viewport listeners when the tooltip unmounts. */
  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('scroll', this.handleViewportChange, true);
  }

  /** Recalculates placement when viewport size or scroll position changes. */
  private readonly handleViewportChange = () => {
    this.updatePlacement();
  };

  /**
   * Builds the arrow offset that keeps the pointer aligned to the trigger,
   * given the tooltip's resolved absolute (viewport) left edge.
   */
  private arrowOffset(
    anchorRect: DOMRect,
    absoluteLeft: number,
    tooltipRect: DOMRect,
  ): number {
    const tooltipArrowInset = 8;
    const centeredOffset =
      anchorRect.left + anchorRect.width / 2 - absoluteLeft;

    return Math.max(
      tooltipArrowInset,
      Math.min(centeredOffset, tooltipRect.width - tooltipArrowInset),
    );
  }

  /**
   * Resolves placement + fixed coordinates through {@link ViewportMetrics} —
   * the exact calculation the suggestion dropdown uses — so the tooltip opens
   * on the side with room and is positioned relative to its containing block
   * rather than clipped by an absolutely-positioned ancestor.
   */
  private updatePlacement(): void {
    const anchorRect = this.anchorRef.current?.getBoundingClientRect();
    const tooltipRect = this.tooltipRef.current?.getBoundingClientRect();

    if (!anchorRect || !tooltipRect || tooltipRect.width === 0) {
      return;
    }

    const containingBlockRect = ViewportMetrics.containingBlockRect(
      this.anchorRef.current,
    );
    const placement = ViewportMetrics.verticalPlacement(
      anchorRect,
      tooltipRect.height,
    );
    const position = ViewportMetrics.overlayPosition({
      anchorRect,
      overlayHeight: tooltipRect.height,
      placement,
      containingBlockRect,
    });

    const absoluteLeft =
      (containingBlockRect ? containingBlockRect.left : 0) + position.left;
    const nextArrowOffset = this.arrowOffset(
      anchorRect,
      absoluteLeft,
      tooltipRect,
    );

    if (
      placement !== this.state.placement
      || nextArrowOffset !== this.state.arrowOffset
      || position.left !== this.state.position?.left
      || position.top !== this.state.position?.top
    ) {
      this.setState({
        placement,
        position,
        arrowOffset: nextArrowOffset,
      });
    }
  }

  /** Builds the inline fixed-position + arrow-offset style for the tooltip. */
  private tooltipStyle(): CSSProperties {
    const style: CSSProperties = {
      ['--so-tooltip-arrow-left' as string]: `${this.state.arrowOffset}px`,
    };
    if (this.state.position) {
      style.left = `${this.state.position.left}px`;
      style.top = `${this.state.position.top}px`;
    }
    return style;
  }

  /** Builds the anchored tooltip copy around the supplied trigger content. */
  render(): ReactElement {
    const p = this.props;

    return (
      <div
        ref={this.anchorRef}
        className={`so-tooltip-anchor${p.showOnFocus ? '' : ' so-tooltip-hover-only'}`}
      >
        {p.children}
        <div
          ref={this.tooltipRef}
          className={`so-tooltip${p.selectable ? ' so-tooltip-selectable' : ''}`}
          id={p.id}
          role="tooltip"
          data-placement={this.state.placement}
          style={this.tooltipStyle()}
        >
          <p className="so-tooltip-title">{p.title}</p>
          {p.description ? (
            <div className="so-tooltip-copy">{p.description}</div>
          ) : null}
        </div>
      </div>
    );
  }
}
