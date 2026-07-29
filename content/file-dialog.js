'use strict';

(() => {
  weh.is_safe.then(() => {
    let store = createStore((state = null, action) => {
      switch (action.type) {
        case 'SET_WEH_DATA':
          state = Object.assign({}, state, {
            wehData: action.payload,
          });
          break;
        case 'SET_ERROR':
          state = Object.assign({}, state, {
            error: action.payload,
          });
          break;
      }
      return state;
    });
    weh.rpc.listen({
      wehInitData: data => {
        store.dispatch({
          type: 'SET_WEH_DATA',
          payload: data,
        });
      },
    });
    var FileDialog = connect(
      (state, ownProps) =>
        Object.assign({}, (state && state.wehData) || {}, {
          error: (state && state.error) || null,
        }),
      dispatch =>
        bindActionCreators(
          {
            setError: error => ({
              type: 'SET_ERROR',
              payload: error,
            }),
            clearError: () => ({
              type: 'SET_ERROR',
              payload: null,
            }),
          },
          dispatch,
        ),
    )(
      class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            files: [],
            parents: [],
            parent: '',
            directory: null,
            filename: null,
            sortField: 'date',
            sortDir: -1,
            modal: null,
            dirExits: void 0,
            selected: {},
            outputConfig: null,
            selectAll: !1,
          };
        }
        componentWillReceiveProps(nextProps) {
          var self = this;
          var homeDir;
          weh.rpc
            .call('coappProxy', 'path.homeJoin', nextProps.directory)
            .then(resolvedDir => ((homeDir = resolvedDir), self.init(homeDir)))
            .then(() => {
              if (!self.state.dirExits && nextProps.createDir) {
                self.setState({
                  modal: {
                    title: weh._('directory_not_exist'),
                    body: weh._('directory_not_exist_body', homeDir),
                    buttons: [
                      {
                        text: weh._('no'),
                        color: 'secondary',
                        click: (() => {
                          weh.trigger(null);
                        }).bind(self),
                      },
                      {
                        text: weh._('yes'),
                        color: 'primary',
                        click: (() => {
                          this.createDirectory(homeDir);
                        }).bind(self),
                      },
                    ],
                  },
                });
              }
            });
        }
        createDirectory(dir) {
          var self = this;
          weh.rpc
            .call('coappProxy', 'fs.mkdirp', dir)
            .then(() => {
              self.setState({
                modal: null,
              });
              self.init(dir);
            })
            .catch(error => {
              self.props.setError(error);
            });
        }
        init(dir) {
          var self = this;
          return weh.rpc
            .call('coappProxy', 'fs.stat', dir)
            .then(() => {
              self.setState({
                dirExits: !0,
              });
            })
            .catch(() => {
              self.setState({
                dirExits: !1,
              });
            })
            .then(() =>
              self.props.uniqueFilename
                ? weh.rpc
                    .call(
                      'coappProxy',
                      'makeUniqueFileName',
                      dir,
                      this.props.filename,
                    )
                    .then(uniqueResult => {
                      self.setState({
                        directory: uniqueResult.directory,
                        filename: uniqueResult.fileName,
                      });
                    })
                : weh.rpc
                    .call('coappProxy', 'path.homeJoin', dir)
                    .then(resolvedDir => {
                      self.setState({
                        directory: resolvedDir || dir,
                        filename: self.props.filename,
                      });
                    })
                    .catch(error => {
                      self.props.setError(error);
                    }),
            )
            .then(() => {
              self.update(dir);
            });
        }
        getTitle() {
          return this.props.titleText || '';
        }
        getModalData() {
          if (!this.props.error) {
            return this.state.modal;
          }
          var self = this;
          return {
            title: weh._('error'),
            body: this.props.error.message,
            buttons: [
              {
                text: weh._('cancel'),
                color: 'secondary',
                click: (() => {
                  this.props.clearError();
                }).bind(self),
              },
            ],
          };
        }
        updateFiles(dir) {
          var self = this;
          if (self.state.dirExits) {
            return weh.rpc
              .call('coappProxy', 'listFiles', dir)
              .then(files => {
                files = files.filter(file => !!file);
                self.setState({
                  files: files,
                });
              })
              .catch(error => {
                self.props.setError(error);
              });
          } else {
            self.setState({
              files: [],
            });
            return Promise.resolve();
          }
        }
        updateParents(dir) {
          var self = this;
          return weh.rpc
            .call('coappProxy', 'getParents', dir)
            .then(parents => {
              self.setState({
                parents: parents,
              });
            })
            .catch(error => {
              self.props.setError(error);
            });
        }
        update(dir) {
          var self = this;
          self.setState({
            parent: '',
            directory: dir,
            selected: {},
            selectAll: !1,
          });
          return self.updateFiles(dir).then(() => self.updateParents(dir));
        }
        updateState(newState) {
          this.setState(newState);
        }
        toParent() {
          var self = this;
          return event => {
            self.init(event.target.value);
          };
        }
        getSize(bytes) {
          if (bytes < 1024) {
            return weh._('Bytes', bytes);
          } else {
            if (bytes < 1024 * 1e3) {
              return weh._('KB', Math.round(bytes / 100) / 10);
            } else {
              if (bytes < 1024 * 1e3 * 1e3) {
                return weh._('MB', Math.round(bytes / 1e5) / 10);
              } else {
                return weh._('GB', Math.round(bytes / 1e8) / 10);
              }
            }
          }
        }
        getDate(timestamp) {
          var nowDate = new Date();
          var fileDate = new Date(timestamp);
          if (
            nowDate.getDate() == fileDate.getDate()
            && nowDate.getMonth() == fileDate.getMonth()
            && nowDate.getFullYear() == fileDate.getFullYear()
          ) {
            return (
              fileDate.getHours()
              + ':'
              + ('00' + fileDate.getMinutes()).substr(-2, 2)
            );
          } else {
            return fileDate.toLocaleDateString();
          }
        }
        sort() {
          var self = this;
          return (fileA, fileB) =>
            self.state.sortField == 'size'
              ? (fileA[1].size - fileB[1].size) * self.state.sortDir
              : self.state.sortField == 'date'
                ? (new Date(fileA[1].mtime).getTime()
                    - new Date(fileB[1].mtime).getTime())
                  * self.state.sortDir
                : fileA[0] == fileB[0]
                  ? 0
                  : fileA[0].toLowerCase() > fileB[0].toLowerCase()
                    ? self.state.sortDir
                    : -self.state.sortDir;
        }
        setSort(field) {
          var self = this;
          return () => {
            if (self.state.sortField == field) {
              self.setState({
                sortDir: -self.state.sortDir,
              });
            } else {
              self.setState({
                sortField: field,
                sortDir: 1,
              });
            }
          };
        }
        showSort(field) {
          if (this.state.sortField == field) {
            if (this.state.sortDir == 1) {
              return '\u25B2';
            } else {
              return '\u25BC';
            }
          } else {
            return '';
          }
        }
        gotoDir(dir) {
          var self = this;
          return () => {
            self.update(dir);
          };
        }
        filenameChanged() {
          var self = this;
          return event => {
            self.setState({
              filename: event.target.value,
            });
          };
        }
        filenameKeyPressed() {
          var self = this;
          return event => {
            if (event.key == 'Enter') {
              self.defaultAction();
            } else {
              if (event.key == 'Escape') {
                weh.trigger(null);
              }
            }
          };
        }
        onKeyDown() {
          var self = this;
          return event => {
            if (event.key == 'Enter') {
              self.defaultAction();
            } else {
              if (event.key == 'Escape') {
                weh.trigger(null);
              }
            }
          };
        }
        selectAllChanged() {
          var self = this;
          return () => {
            var selection = {};
            if (!self.state.selectAll) {
              self.state.files.forEach(([name, entry]) => {
                if (!entry.dir) {
                  selection[name] = !0;
                }
              });
            }
            self.setState({
              selected: selection,
              selectAll: !self.state.selectAll,
            });
          };
        }
        canDefaultAction() {
          var self = this;
          if (this.props.outputConfigs) {
            if (!this.state.outputConfig) {
              return !1;
            }
            var selectedNames = Object.keys(self.state.selected).filter(
              name => !!self.state.selected[name],
            );
            return selectedNames.length > 0;
          } else {
            if (this.props.dirOnly) {
              return !!this.state.directory;
            } else {
              return !!(this.state.filename && this.state.directory);
            }
          }
        }
        defaultAction() {
          var self = this;
          var pathParts = [this.state.directory];
          if (this.state.filename) {
            pathParts.push(this.state.filename);
          }
          weh.rpc
            .call('coappProxy', 'path.homeJoin', ...pathParts)
            .then(filePath => {
              var result = {
                fileName: self.state.filename,
                directory: self.state.directory,
                filePath: filePath,
              };
              if (self.props.outputConfigs) {
                result.selected = Object.keys(self.state.selected).filter(
                  name => !!self.state.selected[name],
                );
                result.outputConfig = self.state.outputConfig;
                delete result.fileName;
                delete result.filePath;
              }
              if (self.props.confirmOverwrite) {
                weh.rpc
                  .call('coappProxy', 'fs.stat', filePath)
                  .then(() => {
                    self.setState({
                      modal: {
                        title: weh._('confirmation_required'),
                        body: weh._('overwrite_file', filePath),
                        buttons: [
                          {
                            text: weh._('no'),
                            color: 'secondary',
                            click: () => {
                              self.setState({
                                modal: null,
                              });
                            },
                          },
                          {
                            text: weh._('yes'),
                            color: 'primary',
                            click: () => {
                              self.setState({
                                modal: null,
                              });
                              weh.trigger(result);
                            },
                          },
                        ],
                      },
                    });
                  })
                  .catch(() => {
                    weh.trigger(result);
                  });
              } else {
                weh.trigger(result);
              }
            });
        }
        callDefaultAction() {
          var self = this;
          return () => {
            self.defaultAction();
          };
        }
        cancel() {
          var self = this;
          return () => {
            weh.trigger(null);
          };
        }
        fileClicked(filename) {
          var self = this;
          return event => {
            self.setState({
              filename: filename,
            });
            if (self.props.selectMultiple) {
              self.setState({
                selected: Object.assign({}, self.state.selected, {
                  [filename]: !self.state.selected[filename],
                }),
              });
            }
          };
        }
        newSubDirectory() {
          var self = this;
          var inputEl = null;
          return () => {
            self.setState({
              modal: {
                title: weh._('new_sub_directory'),
                body: React.createElement('input', {
                  type: 'text',
                  className: 'form-control',
                  ref: element => (inputEl = element),
                  placeholder: weh._('sub_directory_name'),
                }),
                buttons: [
                  {
                    text: weh._('cancel'),
                    color: 'secondary',
                    click: () => {
                      self.setState({
                        modal: null,
                      });
                    },
                  },
                  {
                    text: weh._('create'),
                    color: 'primary',
                    click: () => {
                      self.setState({
                        modal: null,
                      });
                      self.createSubDirectory(inputEl.value);
                    },
                  },
                ],
              },
            });
          };
        }
        createSubDirectory(name) {
          var self = this;
          var dirPath;
          weh.rpc
            .call('coappProxy', 'path.homeJoin', self.state.directory, name)
            .then(
              resolvedPath => (
                (dirPath = resolvedPath),
                weh.rpc.call('coappProxy', 'fs.mkdirp', dirPath)
              ),
            )
            .then(() => {
              self.init(dirPath);
            })
            .catch(error => {
              self.props.setError(error);
            });
        }
        render() {
          var self = this;
          var fileRows = this.state.files.sort(this.sort()).map(entry =>
            entry[1].dir
              ? React.createElement(
                  'tr',
                  {
                    className: 'dir-entry',
                    key: entry[0],
                    onClick: this.gotoDir(entry[1].path),
                  },
                  React.createElement(
                    'td',
                    null,
                    React.createElement('img', {
                      src: 'images/folder.png',
                    }),
                  ),
                  React.createElement(
                    'td',
                    null,
                    React.createElement('div', null, entry[0]),
                  ),
                  !self.props.noSizeColumn && React.createElement('td', null),
                  React.createElement(
                    'td',
                    null,
                    self.getDate(new Date(entry[1].mtime)),
                  ),
                )
              : self.props.dirOnly
                ? null
                : React.createElement(
                    'tr',
                    {
                      className: 'file-entry',
                      key: entry[0],
                      selectedfile:
                        ''
                        + (!self.props.selectMultiple
                          && self.state.filename === entry[0]),
                      onClick: self.fileClicked(entry[0]),
                    },
                    React.createElement(
                      'td',
                      null,
                      self.props.selectMultiple
                        && React.createElement('input', {
                          type: 'checkbox',
                          checked: !!self.state.selected[entry[0]],
                          className: 'form-control',
                        }),
                    ),
                    React.createElement(
                      'td',
                      null,
                      React.createElement('div', null, entry[0]),
                    ),
                    !self.props.noSizeColumn
                      && React.createElement(
                        'td',
                        null,
                        self.getSize(entry[1].size),
                      ),
                    React.createElement(
                      'td',
                      null,
                      self.getDate(new Date(entry[1].mtime)),
                    ),
                  ),
          );
          var parentLinks = this.state.parents.map(parent =>
            React.createElement(
              'option',
              {
                key: parent,
                value: parent,
              },
              parent,
            ),
          );
          if (
            this.props.upDir
            && this.state.parents.length > 0
            && !/^[A-Z]:\\$/.test(this.state.directory)
          ) {
            fileRows.unshift(
              React.createElement(
                'tr',
                {
                  className: 'dir-entry',
                  key: this.state.parents[0],
                  onClick: this.gotoDir(this.state.parents[0]),
                },
                React.createElement(
                  'td',
                  null,
                  React.createElement('img', {
                    src: 'images/folder.png',
                  }),
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('div', null, '..'),
                ),
                React.createElement('td', null),
              ),
            );
          }
          parentLinks.unshift(
            React.createElement(
              'option',
              {
                key: '',
                value: '',
              },
              '\u21E7',
            ),
          );
          return React.createElement(
            'div',
            {
              className: 'weh-shf file-prompt',
              onKeyDown: this.onKeyDown(),
              tabIndex: '0',
            },
            React.createElement(
              'div',
              null,
              React.createElement(WehHeader, {
                title: this.getTitle(),
              }),
              React.createElement(
                'main',
                null,
                React.createElement(
                  'div',
                  {
                    className: 'top-line',
                  },
                  parentLinks.length > 0
                    && React.createElement(
                      'select',
                      {
                        value: this.state.parent,
                        onChange: this.toParent(),
                        className: 'form-control',
                      },
                      parentLinks,
                    ),
                  this.state.filename !== null
                    && this.props.editFileInput
                    && React.createElement('input', {
                      value: this.state.filename,
                      onChange: this.filenameChanged(),
                      onKeyDown: this.filenameKeyPressed(),
                      className: 'form-control',
                      type: 'text',
                    }),
                  this.state.directory !== null
                    && this.props.readonlyDir
                    && React.createElement(
                      'div',
                      {
                        className: 'form-control dir-path',
                        title: this.state.directory,
                      },
                      this.state.directory,
                    ),
                  this.props.newDir
                    && this.state.dirExits
                    && React.createElement(
                      'button',
                      {
                        className: 'btn btn-outline-secondary',
                        title: weh._('new_sub_directory'),
                        onClick: this.newSubDirectory(),
                      },
                      '\u271A',
                    ),
                ),
                this.props.showDir
                  && React.createElement(
                    'div',
                    {
                      className: 'current-directory',
                    },
                    this.state.directory || '',
                  ),
                React.createElement(
                  'div',
                  {
                    className: 'files-list headercontainer',
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'tablecontainer',
                    },
                    React.createElement(
                      'table',
                      null,
                      React.createElement(
                        'thead',
                        null,
                        React.createElement(
                          'tr',
                          null,
                          React.createElement(
                            'th',
                            null,
                            this.props.selectMultiple
                              && React.createElement(
                                'div',
                                null,
                                React.createElement('input', {
                                  type: 'checkbox',
                                  checked: self.state.selectAll,
                                  onChange: self.selectAllChanged(),
                                  className: 'form-control',
                                }),
                              ),
                          ),
                          React.createElement(
                            'th',
                            {
                              onClick: this.setSort('name'),
                            },
                            React.createElement(
                              'div',
                              null,
                              this.showSort('name'),
                              ' ',
                              weh._('file_dialog_name'),
                            ),
                          ),
                          !this.props.noSizeColumn
                            && React.createElement(
                              'th',
                              {
                                onClick: this.setSort('size'),
                              },
                              React.createElement(
                                'div',
                                null,
                                this.showSort('size'),
                                ' ',
                                weh._('file_dialog_size'),
                              ),
                            ),
                          React.createElement(
                            'th',
                            {
                              onClick: this.setSort('date'),
                            },
                            React.createElement(
                              'div',
                              null,
                              this.showSort('date'),
                              ' ',
                              weh._('file_dialog_date'),
                            ),
                          ),
                        ),
                      ),
                      React.createElement('tbody', null, fileRows),
                    ),
                  ),
                ),
                this.props.outputConfigs
                  && React.createElement(
                    'div',
                    {
                      className: 'bottom-component',
                    },
                    React.createElement(OutputConfigSelector, {
                      updateState: this.updateState.bind(this),
                      cancel: this.cancel().bind(this),
                    }),
                  ),
              ),
              React.createElement(
                'footer',
                null,
                React.createElement(
                  'div',
                  {
                    className: 'btn btn-toolbar float-right',
                  },
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-secondary',
                      onClick: this.cancel(),
                    },
                    weh._('cancel'),
                  ),
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-success',
                      disabled: !this.canDefaultAction(),
                      onClick: this.callDefaultAction(),
                    },
                    this.props.okText || '',
                  ),
                ),
              ),
            ),
            React.createElement(VDHModal, {
              modalData: this.getModalData(),
              close: this.props.clearError,
            }),
          );
        }
      },
    );
    class OutputConfigSelector extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          outputConfig: '',
          outputConfigs: {},
        };
        var self = this;
        weh.prefs.then(prefs => {
          prefs.on('dlconvLastOutput', (settingName, value) => {
            self.setState({
              outputConfig: value,
            });
            self.props.updateState({
              outputConfig: value,
            });
          });
        });
      }
      componentWillMount() {
        var self = this;
        weh.rpc.call('getOutputConfigs').then(configs => {
          self.setState({
            outputConfigs: configs,
          });
        });
      }
      changeOutput() {
        var self = this;
        return event => {
          self.setState({
            outputConfig: event.target.value,
          });
          self.props.updateState({
            outputConfig: event.target.value,
          });
        };
      }
      configOutputs() {
        var self = this;
        return () => {
          weh.rpc.call('editConverterConfigs', self.state.outputConfig);
          self.props.cancel();
        };
      }
      render() {
        var self = this;
        var configMap;
        if (this.state.outputConfig) {
          configMap = this.state.outputConfigs;
        } else {
          configMap = Object.assign({}, this.state.outputConfigs, {
            '': {
              title: weh._('select_output_config'),
            },
          });
        }
        var configOptions = Object.keys(configMap)
          .sort()
          .map(configKey =>
            React.createElement(
              'option',
              {
                key: configKey,
                value: configKey,
              },
              configMap[configKey].title,
            ),
          );
        return React.createElement(
          'div',
          {
            className: 'output-conf-sel',
          },
          React.createElement('span', null, weh._('output_configuration')),
          React.createElement(
            'select',
            {
              className: 'form-control',
              onChange: this.changeOutput(),
              value: this.state.outputConfig,
            },
            configOptions,
          ),
          React.createElement(
            'a',
            {
              href: '#',
              onClick: this.configOutputs(),
            },
            weh._('dlconv_output_details'),
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
        React.createElement(FileDialog, {
          store: store,
        }),
      ),
      document.getElementById('root'),
    );
  });
})();
