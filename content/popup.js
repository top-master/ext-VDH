'use strict';

(() => {
  var defineCommonjsModule = (defineModule, cachedExports) => () => (
    cachedExports
      || defineModule(
        (cachedExports = {
          exports: {},
        }).exports,
        cachedExports,
      ),
    cachedExports.exports
  );
  var configModule = defineCommonjsModule((moduleExports, moduleObject) => {
    moduleObject.exports = {
      prod: !0,
      channel: 'stable',
      buildDate: '2024-10-15',
      buildOptions: {
        linuxlic: !1,
        noyt: !0,
        target: 'google',
        browser: 'chrome',
      },
    };
  });
  var noneSingleton = globalThis.tsResults.None;

  var SomeImpl = globalThis.tsResults.Some;
  var Some = SomeImpl;

  var runAsyncGenerator = function (
    thisArg,
    argsArray,
    promiseCtor,
    generator,
  ) {
    function adopt(maybePromise) {
      if (maybePromise instanceof promiseCtor) {
        return maybePromise;
      } else {
        return new promiseCtor(function (resolveInner) {
          resolveInner(maybePromise);
        });
      }
    }
    return new (promiseCtor || (promiseCtor = Promise))(function (
      resolveOuter,
      rejectOuter,
    ) {
      function onFulfilled(sentValue) {
        try {
          stepGenerator(generator.next(sentValue));
        } catch (caughtError) {
          rejectOuter(caughtError);
        }
      }
      function onRejected(thrownValue) {
        try {
          stepGenerator(generator.throw(thrownValue));
        } catch (caughtError) {
          rejectOuter(caughtError);
        }
      }
      function stepGenerator(stepResult) {
        if (stepResult.done) {
          resolveOuter(stepResult.value);
        } else {
          adopt(stepResult.value).then(onFulfilled, onRejected);
        }
      }
      stepGenerator(
        (generator = generator.apply(thisArg, argsArray || [])).next(),
      );
    });
  };
  function augmentIterable(iterableClass) {
    Object.assign(iterableClass.prototype, {
      find: function (predicate) {
        for (let element of this) {
          if (predicate(element)) {
            return Some(element);
          }
        }
        return noneSingleton;
      },
      count: function (predicate) {
        return this.reduce(
          (runningCount, element) => (
            predicate(element) && runningCount++,
            runningCount
          ),
          0,
        );
      },
      reduce: function (reducer, initialValue) {
        let accumulator = initialValue;
        for (let element of this) {
          accumulator = reducer(accumulator, element);
        }
        return accumulator;
      },
      every: function (predicate) {
        return !this.any(element => !predicate(element));
      },
      any: function (predicate) {
        for (let element of this) {
          if (predicate(element)) {
            return !0;
          }
        }
        return !1;
      },
      map: function (mapFn) {
        return this.filterMap(element => Some(mapFn(element)));
      },
      filter: function (predicate) {
        return this.filterMap(element =>
          predicate(element) ? Some(element) : noneSingleton,
        );
      },
      enumerate: function () {
        let sourceIterable = this;
        return augmentIterable(function* () {
          let elementIndex = 0;
          for (let element of sourceIterable) {
            yield [elementIndex, element];
            elementIndex++;
          }
        })();
      },
      filterMap: function (mapToOption) {
        let sourceIterable = this;
        return augmentIterable(function* () {
          for (let element of sourceIterable) {
            let mappedOption = mapToOption(element);
            if (mappedOption.isSome()) {
              yield mappedOption.unwrap();
            }
          }
        })();
      },
      sort: function (comparator) {
        let sortedArray = this.toArray();
        sortedArray.sort(comparator);
        return sortedArray;
      },
      toArray: function () {
        return [...this];
      },
    });
    return iterableClass;
  }
  if (!Array.prototype.as_iter) {
    Array.prototype.as_iter = function () {
      let sourceArray = this;
      return augmentIterable(function* () {
        for (let element of sourceArray) {
          yield element;
        }
      })();
    };
  }
  if (!Set.prototype.as_iter) {
    Set.prototype.as_iter = function () {
      let sourceSet = this;
      return augmentIterable(function* () {
        for (let element of sourceSet) {
          yield element;
        }
      })();
    };
  }
  if (!Map.prototype.as_iter) {
    Map.prototype.as_iter = function () {
      let sourceMap = this;
      return augmentIterable(function* () {
        for (let element of sourceMap) {
          yield element;
        }
      })();
    };
  }
  weh.is_safe.then(() => {
    let numberUnitRegex = new RegExp('([\\d\\.]+)\\s*(\\S+)');
    let highlightedSelectors = new Set();
    window.addEventListener('unload', () => {
      for (let selectorAttr of highlightedSelectors) {
        weh.rpc.call('galleryUnhighlight', selectorAttr);
      }
    });
    let buildOptions = configModule().buildOptions || {};
    if (buildOptions.browser != 'firefox') {
      document.querySelector('html').style.width = '500px';
    }
    function makeEmptyCounters() {
      return {
        active: 0,
        inactive: 0,
        orphan: 0,
        pinned: 0,
        running: 0,
      };
    }
    function appStateReducer(
      state = {
        hits: [],
        hits_for_current_section: [],
        progress: {},
        actionHit: null,
        actions: {},
        logs: [],
        embed: null,
        maxHeight: void 0,
      },
      action,
    ) {
      switch (action.type) {
        case 'setActionHit':
          state = Object.assign({}, state, {
            actionHit: action.payload,
          });
          break;
        case 'clearActionHit':
          state = Object.assign({}, state, {
            actionHit: null,
            embed: null,
          });
          break;
        case 'updateData':
          state = Object.assign({}, state, action.payload);
          break;
        case 'embed':
          state = Object.assign({}, state, {
            embed: action.payload,
          });
          break;
        case 'setMaxHeight':
          state = Object.assign({}, state, {
            maxHeight: action.payload,
          });
          break;
      }
      return state;
    }
    let store = createStore(appStateReducer);
    weh.rpc.listen({
      hits: hitsPayload => {
        store.dispatch({
          type: 'updateData',
          payload: {
            hits: hitsPayload,
          },
        });
      },
      progress: progressPayload => {
        store.dispatch({
          type: 'updateData',
          payload: {
            progress: progressPayload,
          },
        });
      },
      logs: logsPayload => {
        store.dispatch({
          type: 'updateData',
          payload: {
            logs: logsPayload,
          },
        });
      },
      copyToClipboard: clipboardText => {
        var inputElement = document.createElement('input');
        document.body.appendChild(inputElement);
        inputElement.value = clipboardText;
        inputElement.select();
        document.execCommand('Copy');
        document.body.removeChild(inputElement);
      },
      embed: embedPayload => {
        store.dispatch({
          type: 'embed',
          payload: embedPayload,
        });
      },
    });
    weh.prefs.then(prefs => {
      let updateMaxHeight = leftOverHeight => {
        let maxHeightCap;
        switch (buildOptions.browser) {
          case 'chrome':
            maxHeightCap = 590;
            break;
          case 'edge':
            maxHeightCap = 500;
            break;
          default:
            maxHeightCap = 600;
        }
        browser.windows.getLastFocused().then(focusedWindow => {
          store.dispatch({
            type: 'setMaxHeight',
            payload:
              ''
              + Math.min(maxHeightCap, focusedWindow.height - leftOverHeight)
              + 'px',
          });
        });
      };
      prefs.on('popupHeightLeftOver', (messageName, leftOverHeight) =>
        updateMaxHeight(leftOverHeight),
      );
      updateMaxHeight(prefs.popupHeightLeftOver);
    });
    weh.rpc.call('getMainData').then(mainData => {
      store.dispatch({
        type: 'updateData',
        payload: mainData,
      });
    });
    var ConnectedApp = connect(
      (reduxState, ownProps) => ({
        hits: reduxState.hits || [],
        progress: reduxState.progress || {},
        actionHit: reduxState.actionHit || null,
        actions: reduxState.actions || {},
        logs: reduxState.logs || [],
        embed: reduxState.embed || null,
        maxHeight: reduxState.maxHeight || void 0,
      }),
      dispatchFn => bindActionCreators({}, dispatchFn),
    )(
      class extends React.Component {
        constructor(initialProps) {
          super(initialProps);
          this.state = {
            section: 'active',
            hits: [],
            hits_for_current_section: [],
            counters: makeEmptyCounters(),
            actionHit: null,
          };
          this.call = this.call.bind(this);
        }
        componentWillReceiveProps(nextProps) {
          this.buildGroups(nextProps.hits);
          this.setState({
            actionHit: nextProps.actionHit,
          });
        }
        call(...rpcArgs) {
          return () => {
            weh.rpc.call(...rpcArgs);
          };
        }
        canClear() {
          for (let hitGroup of this.state.hits) {
            for (let hit of hitGroup) {
              if (
                hit.status == 'active'
                || hit.status == 'inactive'
                || hit.status == 'orphan'
              ) {
                return !0;
              }
            }
          }
          return !1;
        }
        buildGroups(allHitGroups, section) {
          section = section || this.state.section;
          let nextState = {
            counters: makeEmptyCounters(),
          };
          if (!allHitGroups) {
            nextState.hits = [];
            nextState.hits_for_current_section = [];
            this.setState(nextState);
            return;
          }
          for (let hitGroup of allHitGroups) {
            for (let hit of hitGroup) {
              nextState.counters[hit.status]++;
            }
          }
          let sectionGroups = allHitGroups
            .as_iter()
            .map(hitGroup =>
              hitGroup
                .as_iter()
                .filter(hit => hit.status == section)
                .toArray(),
            )
            .filter(hitGroup => hitGroup.length > 0)
            .toArray();
          for (let hitGroup of sectionGroups) {
            hitGroup[0].primary = !0;
          }
          nextState.hits_for_current_section = sectionGroups;
          nextState.hits = allHitGroups;
          this.setState(nextState);
        }
        logDetails(logKey) {
          return () => {
            weh.rpc.call('logDetails', logKey);
          };
        }
        command(commandName) {
          var component = this;
          return clickEvent => {
            clickEvent.stopPropagation();
            var shiftKeyHeld = clickEvent.shiftKey;
            var actionHit = component.state.actionHit;
            if (actionHit) {
              weh.rpc
                .call('actionCommand', commandName, actionHit.id)
                .then(commandResult => {
                  if (!shiftKeyHeld && !commandResult) {
                    if (commandName == 'copyurl') {
                      setTimeout(() => window.close(), 500);
                    } else {
                      window.close();
                    }
                  } else {
                    if (commandName == 'deletehit') {
                      store.dispatch({
                        type: 'clearActionHit',
                      });
                    }
                  }
                });
            }
            if (component.asDefaultInput && component.asDefaultInput.checked) {
              weh.unsafe_prefs[
                'default-action-'
                  + (component.props.actions[commandName].catPriority || 0)
              ] = commandName;
            }
          };
        }
        renderActions() {
          if (!this.state.actionHit || this.props.embed) {
            return null;
          }
          var component = this;
          var actionElements = (this.state.actionHit.actions || []).map(
            actionName =>
              React.createElement(
                'div',
                {
                  key: actionName,
                  className: 'vdh-container click action',
                },
                React.createElement(
                  'div',
                  {
                    onClick: this.command(actionName),
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'action-thumbnail',
                    },
                    React.createElement('img', {
                      src: component.props.actions[actionName].icon,
                    }),
                  ),
                  React.createElement(
                    'div',
                    {
                      className: 'action-details',
                    },
                    React.createElement(
                      'div',
                      {
                        className: 'action-title',
                      },
                      component.props.actions[actionName].title,
                    ),
                    React.createElement(
                      'div',
                      {
                        className: 'action-descr',
                      },
                      component.props.actions[actionName].description,
                    ),
                  ),
                ),
              ),
          );
          return React.createElement(
            'div',
            {
              className: 'actions',
            },
            actionElements,
            React.createElement(
              'div',
              {
                className: 'default-check',
              },
              React.createElement('input', {
                id: 'checkbox1',
                type: 'checkbox',
                ref: inputNode => (this.asDefaultInput = inputNode),
              }),
              React.createElement(
                'label',
                {
                  htmlFor: 'checkbox1',
                },
                weh._('action_as_default'),
              ),
            ),
          );
        }
        renderEmbed() {
          if (this.props.embed) {
            return React.createElement(Embedded, {
              className: 'embed',
              src: this.props.embed,
            });
          } else {
            return null;
          }
        }
        renderLog() {
          var component = this;
          var logElements = this.props.logs.map(logEntry =>
            React.createElement(
              'div',
              {
                key: logEntry.key,
                className: 'vdh-log vdh-log-' + logEntry.type,
              },
              logEntry.videoTitle
                && React.createElement(
                  'div',
                  {
                    className: 'log-video-title',
                  },
                  logEntry.videoTitle,
                ),
              logEntry.message,
              logEntry.details
                && React.createElement(
                  'a',
                  {
                    onClick: component.logDetails(logEntry.key),
                    href: '#',
                  },
                  weh._('details_parenthesis'),
                ),
            ),
          );
          return React.createElement(
            'div',
            {
              className: 'logs',
            },
            logElements,
          );
        }
        renderNoHit() {
          if (this.state.section == 'active') {
            return React.createElement(
              'div',
              {
                className: 'no-media',
              },
              React.createElement('h2', null, weh._('no_media_current_tab')),
              React.createElement(
                'p',
                null,
                weh._('no_media_to_process_descr'),
              ),
            );
          } else {
            return React.createElement(
              'div',
              {
                className: 'no-media',
              },
              React.createElement('h2', null, weh._('no_media_to_process')),
            );
          }
        }
        renderHits() {
          if (this.state.section == 'log') {
            return this.renderLog();
          }
          if (this.state.hits_for_current_section.length == 0) {
            return this.renderNoHit();
          }
          let component = this;
          return React.createElement(
            'div',
            {
              className: 'has-media',
            },
            this.state.hits_for_current_section.map(hitGroup => {
              let primaryHit = hitGroup[0];
              let isSingleHit = hitGroup.length == 1;
              let // TODO(thumbnails): Static review of changes after 01f84f4 found that the
                // default popup/sidebar path was not touched in that range, but this legacy
                // popup still ignores `thumbnailUrl2`. Even if the background serializer starts
                // forwarding the resolved fallback thumbnail, this consumer will keep dropping
                // it until the fallback chain accepts the same field names as the hit producer.
                thumbnailUrl =
                  primaryHit.thumbnailUrl
                  ?? primaryHit.thumbnail
                  ?? './images/no-thumbnail.png';
              return React.createElement(
                'div',
                {
                  key: primaryHit.group,
                  className:
                    (isSingleHit ? 'hit-group-single' : '') + ' hit-group',
                },
                React.createElement(
                  'div',
                  {
                    className: 'hit-thumbnail',
                  },
                  React.createElement('img', {
                    src: thumbnailUrl,
                  }),
                ),
                React.createElement(
                  'div',
                  null,
                  hitGroup.map(hit => {
                    let defaultAction = component.props.actions[hit.actions[0]];
                    let hitProgress = component.props.progress[hit.id];
                    return React.createElement(HitView, {
                      key: hit.id,
                      hit: hit,
                      progress: hitProgress,
                      defaultAction: defaultAction,
                    });
                  }),
                ),
              );
            }),
          );
        }
        renderFooterButtons() {
          return React.createElement(
            'div',
            {
              className: 'buttons',
            },
            React.createElement(
              'div',
              {
                className: 'buttons-container',
              },
              React.createElement(
                'div',
                {
                  className: 'buttons-opener',
                },
                React.createElement('img', {
                  src: 'images/icon-3dots-64.png',
                }),
              ),
              React.createElement(
                'button',
                {
                  onClick: this.call('openAbout'),
                  title: weh._('about'),
                },
                React.createElement('img', {
                  src: 'images/icon-about-64.png',
                }),
              ),
              buildOptions.browser == 'firefox'
                && React.createElement(
                  'button',
                  {
                    onClick: this.call('openSites'),
                    title: weh._('supported_sites'),
                  },
                  React.createElement('img', {
                    src: 'images/icon-sites-list-64.png',
                  }),
                ),
              React.createElement(
                'button',
                {
                  onClick: this.call('analyzePage'),
                  title: weh._('analyze_page'),
                },
                React.createElement('img', {
                  src: 'images/icon-photo-64.png',
                }),
              ),
              React.createElement(
                'button',
                {
                  onClick: this.call('convertLocal'),
                  title: weh._('convert_local_files'),
                },
                React.createElement('img', {
                  src: 'images/icon-action-convert-b-64.png',
                }),
              ),
              React.createElement(
                'button',
                {
                  onClick: this.call('mergeLocal'),
                  title: weh._('merge_local_files'),
                },
                React.createElement('img', {
                  src: 'images/icon-merger-64.png',
                }),
              ),
              React.createElement('div', {
                className: 'separator',
              }),
              React.createElement(
                'div',
                {
                  className: 'separator',
                },
                '\xA0',
              ),
              this.canClear()
                && React.createElement(
                  'button',
                  {
                    onClick: this.call('clearHits', 'all'),
                    title: weh._('clear_hits'),
                  },
                  React.createElement('img', {
                    src: 'images/icon-action-delete-64.png',
                  }),
                ),
            ),
          );
        }
        setSection(section) {
          var component = this;
          return () => {
            component.buildGroups(component.state.hits, section);
            component.setState({
              section: section,
            });
          };
        }
        clearLogs() {
          var component = this;
          return () => {
            weh.rpc.call('clearLogs').then(component.setSection('active'));
          };
        }
        shouldDisplayGroupText(section) {
          if (
            this.state.section == section
            || (section == 'log' && this.props.logs.length == 0)
          ) {
            return !1;
          }
          for (
            var counterKeys = Object.keys(this.state.counters), keyIndex = 0;
            keyIndex < counterKeys.length;
            keyIndex++
          ) {
            var counterKey = counterKeys[keyIndex];
            var counterValue = this.state.counters[counterKey];
            if (
              (counterKey == section && counterValue == 0)
              || (counterKey != section
                && counterKey != this.state.section
                && counterValue > 0)
            ) {
              return !1;
            }
          }
          return !(section != 'log' && this.props.logs.length > 0);
        }
        showGroupBadge(section, labelKey) {
          var badgeTitle = '';
          var badgeCount = 0;
          var targetSection = section;
          if (this.state.section == section) {
            return null;
          }
          if (section == 'log') {
            if (((badgeCount = this.props.logs.length), badgeCount == 0)) {
              return null;
            }
            var errorLogs = this.props.logs.filter(
              logEntry => logEntry.type == 'error',
            );
            if (errorLogs.length > 0) {
              badgeTitle = weh._('errors');
              badgeCount = errorLogs.length;
              section = 'error';
            } else {
              badgeTitle = weh._('logs');
            }
          } else {
            if (this.state.counters[section] == 0) {
              return;
            }
            badgeTitle = weh._(labelKey);
            badgeCount = this.state.counters[section];
          }
          return React.createElement(
            'div',
            {
              className: 'click group group-' + section,
              onClick: this.setSection(targetSection),
              title: badgeTitle,
            },
            React.createElement(
              'div',
              null,
              React.createElement('div', null, badgeCount),
            ),
          );
        }
        showGroupText(section, labelKey) {
          if (this.shouldDisplayGroupText(section)) {
            var errorCount = this.props.logs.filter(
              logEntry => logEntry.type == 'error',
            ).length;
            if (section == 'log' && errorCount > 0) {
              labelKey = 'errors';
            }
            return React.createElement(
              'div',
              {
                className: 'click group-text',
                onClick: this.setSection(section),
              },
              weh._(labelKey),
            );
          } else {
            return null;
          }
        }
        renderFooterGroups() {
          return React.createElement(
            'div',
            {
              className: 'groups',
            },
            this.showGroupBadge('active', 'in_current_tab'),
            this.showGroupText('active', 'in_current_tab'),
            this.showGroupBadge('inactive', 'in_other_tab'),
            this.showGroupText('inactive', 'in_other_tab'),
            this.showGroupBadge('orphan', 'orphan'),
            this.showGroupText('orphan', 'orphan'),
            this.showGroupBadge('pinned', 'pinned'),
            this.showGroupText('pinned', 'pinned'),
            this.showGroupBadge('running', 'running'),
            this.showGroupText('running', 'running'),
            this.showGroupBadge('log', 'logs'),
            this.showGroupText('log', 'logs'),
          );
        }
        renderFooter() {
          return React.createElement(
            'footer',
            null,
            React.createElement(
              'div',
              {
                className: 'right-side',
              },
              React.createElement(
                'div',
                {
                  className: 'separator',
                },
                '\xA0',
              ),
              React.createElement(
                'button',
                {
                  onClick: this.call('openSettings'),
                  title: weh._('settings'),
                },
                React.createElement('img', {
                  src: 'images/icon-settings-64.png',
                }),
              ),
            ),
            this.renderFooterButtons(),
            this.renderFooterGroups(),
          );
        }
        clearActionHit() {
          return () => {
            store.dispatch({
              type: 'clearActionHit',
            });
          };
        }
        render() {
          return React.createElement(
            'div',
            {
              className:
                'main-panel '
                + (((this.state.actionHit || this.props.embed)
                  && 'actions-open ')
                  || ' '),
            },
            this.renderActions(),
            this.renderEmbed(),
            React.createElement(
              'div',
              {
                className: 'main-content section-' + this.state.section,
                style: {
                  maxHeight: this.props.maxHeight,
                },
              },
              React.createElement('img', {
                className: 'click back-active',
                onClick: this.setSection('active'),
                src: 'images/icon-chevron-left-64.png',
              }),
              this.state.section == 'log'
                && React.createElement('img', {
                  className: 'click clear-logs',
                  onClick: this.clearLogs(),
                  src: 'images/icon-action-delete-64.png',
                  title: weh._('clear_logs'),
                }),
              React.createElement('div', {
                className: 'click back-margin',
                onClick: this.setSection('active'),
              }),
              React.createElement(
                'main',
                {
                  className: 'content-hits',
                },
                this.renderHits(),
                React.createElement('div', {
                  className: 'main-content-mask',
                  onClick: this.clearActionHit(),
                }),
              ),
              this.renderFooter(),
            ),
          );
        }
      },
    );
    class HitView extends React.Component {
      constructor(initialProps) {
        super(initialProps);
        this.action = this.action.bind(this);
        this.state = {};
      }
      componentWillReceiveProps(nextProps) {
        if (!this.orphanTimer) {
          this.updateOrphanTimer(nextProps);
        }
      }
      componentDidMount() {
        if (!this.orphanTimer) {
          this.updateOrphanTimer();
        }
      }
      componentWillUnmount() {
        if (this.orphanTimer) {
          clearTimeout(this.orphanTimer);
          this.orphanTimer = null;
        }
      }
      updateOrphanTimer(nextProps) {
        if (
          ((nextProps = nextProps || this.props),
          (this.orphanTimer = null),
          this.props.hit.status == 'orphan')
        ) {
          var nowMs = Date.now();
          var orphanStart = this.props.hit.orphanT0;
          var orphanEnd = this.props.hit.orphanT;
          this.setState({
            orphanTimer: Math.max(
              0,
              Math.min(
                100,
                (100 * (orphanEnd - nowMs)) / (orphanEnd - orphanStart),
              ),
            ),
          });
          this.orphanTimer = setTimeout(this.updateOrphanTimer.bind(this), 1e3);
        }
      }
      action(actionEvent) {}
      getClass() {
        return '';
      }
      durationString(totalSeconds) {
        totalSeconds = ~~totalSeconds;
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;
        if (hours > 0) {
          return (
            hours
            + ':'
            + ('00' + minutes).substr(-2)
            + ':'
            + ('00' + seconds).substr(-2)
          );
        } else {
          return minutes + ':' + ('00' + seconds).substr(-2);
        }
      }
      description() {
        var hit = this.props.hit;
        if (hit.description) {
          return hit.description;
        }
        var descriptionParts = [];
        let isDownloading = hit.operation === 'downloading';
        let rawBitrate = hit.raw_bitrate ?? 0;
        if (isDownloading) {
          let progressPercent = this.props.progress;
          if (
            hit.opStartDate
            && typeof progressPercent == 'number'
            && progressPercent >= 0
          ) {
            if (progressPercent === 1 / 0) {
              descriptionParts.push(weh._('live_stream'));
            } else if (
              (descriptionParts.push(progressPercent + '%'),
              progressPercent > 0)
            ) {
              let remainingMs =
                ((Date.now() - hit.opStartDate) / progressPercent)
                * (100 - progressPercent);
              remainingMs = Math.max(0, Math.floor(remainingMs / 1e3));
              descriptionParts.push(this.durationString(remainingMs));
            }
          }
          if (rawBitrate > 0) {
            let speedText = '';
            if (rawBitrate < 1048576) {
              speedText =
                weh._('KB', (~~((10 * rawBitrate) / 1024) / 10).toString())
                + '/s';
            } else {
              speedText =
                weh._('MB', (~~((10 * rawBitrate) / 1048576) / 10).toString())
                + '/s';
            }
            descriptionParts.push(speedText);
          }
        }
        if (!isDownloading) {
          if ((hit.size && descriptionParts.push(hit.size), hit.quality)) {
            let qualityLabel = weh._('quality_' + hit.quality);
            if (qualityLabel == '') {
              qualityLabel = hit.quality.toUpperCase();
            }
            descriptionParts.push(qualityLabel);
          }
          if (
            (typeof hit.duration == 'number'
              && descriptionParts.push(this.durationString(hit.duration)),
            hit.bitrate)
          ) {
            var bitrateValue = hit.bitrate;
            var bitrateUnit = 'bps';
            if (hit.bitrate > 1e7) {
              bitrateUnit = 'Mbps';
              bitrateValue = Math.round(hit.bitrate / 1e6);
            } else {
              if (hit.bitrate > 1e6) {
                bitrateUnit = 'Mbps';
                bitrateValue = Math.round(hit.bitrate / 1e5) / 10;
              } else {
                if (hit.bitrate > 1e4) {
                  bitrateUnit = 'Kbps';
                  bitrateValue = Math.round(hit.bitrate / 1e3);
                } else {
                  if (hit.bitrate > 1e3) {
                    bitrateUnit = 'Kbps';
                    bitrateValue = Math.round(hit.bitrate / 100) / 10;
                  }
                }
              }
            }
            descriptionParts.push(bitrateValue + bitrateUnit);
          }
          let lengthLabel = this.lengthString();
          if (lengthLabel) {
            descriptionParts.push(lengthLabel);
          }
          if (hit.extension) {
            if (hit.originalExt && hit.originalExt != hit.extension) {
              descriptionParts.push(
                hit.originalExt.toUpperCase()
                  + '>'
                  + hit.extension.toUpperCase(),
              );
            }
            descriptionParts.push(hit.extension.toUpperCase());
          }
          if (hit.descrPrefix) {
            descriptionParts.push(hit.descrPrefix);
          }
          if (hit.mediaDomain) {
            descriptionParts.push(weh._('from_domain', [hit.mediaDomain]));
          }
        }
        return descriptionParts.join(' - ');
      }
      lengthString() {
        var hit = this.props.hit;
        if (hit.length) {
          if (hit.length > 1024 * 1024) {
            return weh._('MB', [
              Math.round((hit.length * 10) / (1024 * 1024)) / 10,
            ]);
          } else {
            if (hit.length > 1024) {
              return weh._('KB', [Math.round((hit.length * 10) / 1024) / 10]);
            } else {
              return weh._('Bytes', [hit.length]);
            }
          }
        } else {
          return null;
        }
      }
      titleClass() {
        var titleClassNames = ['hit-title-text'];
        titleClassNames.push('hit-title-text-' + weh.unsafe_prefs.titleMode);
        return titleClassNames.join(' ');
      }
      progress() {
        if (this.props.progress == 1 / 0) {
          return {
            width: '100%',
          };
        } else {
          if (typeof this.props.progress != 'number') {
            return {
              width: '0%',
            };
          } else {
            return {
              width: this.props.progress + '%',
            };
          }
        }
      }
      orphanTimerStyle() {
        return {
          width: (this.state.orphanTimer || 100) + '%',
        };
      }
      moreActions() {
        var component = this;
        return clickEvent => {
          clickEvent.stopPropagation();
          store.dispatch({
            type: 'setActionHit',
            payload: component.props.hit,
          });
        };
      }
      call(...rpcArgs) {
        return () => {
          weh.rpc.call(...rpcArgs);
        };
      }
      callDefault() {
        var component = this;
        return clickEvent => {
          clickEvent.stopPropagation();
          var shiftKeyHeld = clickEvent.shiftKey;
          let defaultActionName = component.props.hit.actions[0];
          weh.rpc
            .call('actionCommand', defaultActionName, component.props.hit.id)
            .then(commandResult => {
              if (!shiftKeyHeld && !commandResult) {
                if (defaultActionName == 'copyurl') {
                  setTimeout(() => window.close(), 500);
                } else {
                  window.close();
                }
              }
            });
        };
      }
      onMouseEnter() {
        var component = this;
        return () => {
          highlightedSelectors.add(component.props.hit.selectorAttr);
          weh.rpc.call('galleryHighlight', component.props.hit.selectorAttr);
        };
      }
      onMouseLeave() {
        var component = this;
        return () => {
          highlightedSelectors.delete(component.props.hit.selectorAttr);
          weh.rpc.call('galleryUnhighlight', component.props.hit.selectorAttr);
        };
      }
      render() {
        var hit = this.props.hit;
        return React.createElement(
          'div',
          {
            className: 'click hit ' + this.getClass(),
            onMouseEnter: hit.mouseTrack && this.onMouseEnter(),
            onMouseLeave: hit.mouseTrack && this.onMouseLeave(),
            onClick: this.callDefault(),
          },
          React.createElement(
            'div',
            {
              className: 'vdh-container',
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                {
                  className: 'vdh-fullwidth hit-descr',
                },
                hit.primary
                  && React.createElement(
                    'div',
                    {
                      className: 'hit-title',
                    },
                    React.createElement(
                      'div',
                      {
                        className: this.titleClass(),
                      },
                      hit.title,
                    ),
                  ),
                React.createElement(
                  'div',
                  {
                    className: 'hit-summary',
                  },
                  this.props.defaultAction
                    && React.createElement(
                      'div',
                      {
                        className: 'hit-summary-action',
                        title: this.props.defaultAction.description,
                      },
                      React.createElement(
                        'div',
                        null,
                        React.createElement('img', {
                          className: 'default-action',
                          src: this.props.defaultAction.icon,
                        }),
                      ),
                    ),
                  hit.primary
                    && weh.unsafe_prefs.hitsGotoTab
                    && hit.topUrl
                    && hit.status == 'inactive'
                    && React.createElement('img', {
                      className: 'hit-descr-button',
                      src: 'images/icon-gototab-64.png',
                      title: weh._('hit_go_to_tab'),
                      onClick: this.call('gotoTab', hit.topUrl),
                    }),
                  hit.operation
                    && React.createElement(
                      'span',
                      {
                        className: 'hit-operation',
                      },
                      weh._(hit.operation) + ' - ',
                    ),
                  this.description(),
                ),
                hit.status == 'running'
                  && React.createElement(
                    'div',
                    {
                      className: 'hit-progress',
                    },
                    React.createElement('div', {
                      style: this.progress(),
                    }),
                  ),
                hit.status == 'orphan'
                  && React.createElement(
                    'div',
                    {
                      className: 'hit-progress hit-orphan',
                    },
                    React.createElement('div', {
                      style: this.orphanTimerStyle(),
                    }),
                  ),
              ),
              React.createElement(
                'div',
                {
                  className: 'click hit-actions',
                  onClick: this.moreActions(),
                },
                React.createElement(
                  'div',
                  null,
                  React.createElement('img', {
                    className: 'more-actions',
                    src: 'images/icon-3dots-64.png',
                  }),
                ),
              ),
            ),
          ),
        );
      }
    }
    render(
      React.createElement(
        Provider,
        {
          store: store,
        },
        React.createElement(ConnectedApp, null),
      ),
      document.getElementById('root'),
    );
  });
})();
