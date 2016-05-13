'use strict';

System.register('pushedx/realtime-chat/components/ChatFrame', ['flarum/Component', 'flarum/helpers/icon', 'flarum/components/LoadingIndicator', 'flarum/helpers/avatar'], function (_export, _context) {
    var Component, icon, LoadingIndicator, avatar, ChatFrame;


    function ChatMessage(user, message) {
        this.user = user;
        this.message = message;
    }

    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }],
        execute: function () {
            ChatFrame = function (_Component) {
                babelHelpers.inherits(ChatFrame, _Component);

                function ChatFrame() {
                    babelHelpers.classCallCheck(this, ChatFrame);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ChatFrame).apply(this, arguments));
                }

                babelHelpers.createClass(ChatFrame, [{
                    key: 'init',
                    value: function init() {
                        this.status = null;
                    }
                }, {
                    key: 'getChat',
                    value: function getChat(el) {
                        return el.id == 'chat' ? el : typeof el.parentNode !== 'undefined' ? this.getChat(el.parentNode) : null;
                    }
                }, {
                    key: 'checkFocus',
                    value: function checkFocus(e) {
                        // Get the chat div from the event target
                        var chat = this.getChat(e.target);

                        if (chat.className.indexOf("active") >= 0) {
                            e.preventDefault();
                            e.stopPropagation();

                            return;
                        }
                    }
                }, {
                    key: 'setFocus',
                    value: function setFocus(e) {
                        // Get the chat div from the event target
                        var chat = this.getChat(e.target);

                        // Find the input element
                        for (var i = 0; i < chat.children.length; ++i) {
                            var el = chat.children[i];
                            if (el.tagName.toLowerCase() == 'input') {
                                // Focus it
                                el.focus();
                            }
                        }
                    }
                }, {
                    key: 'focus',
                    value: function focus(e) {
                        e.target.parentNode.className = "frame active";
                    }
                }, {
                    key: 'blur',
                    value: function blur(e) {
                        e.target.parentNode.className = "frame";
                    }
                }, {
                    key: 'scroll',
                    value: function scroll(e) {
                        if (this.status.autoScroll) {
                            e.scrollTop = e.scrollHeight;
                        }

                        this.status.autoScroll = e.scrollTop + e.offsetHeight == e.scrollHeight;
                    }
                }, {
                    key: 'disableAutoScroll',
                    value: function disableAutoScroll(e) {
                        this.status.autoScroll = e.scrollTop + e.offsetHeight == e.scrollHeight;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m('div', { className: 'chat left container' }, [m('div', { className: 'frame', id: 'chat', onmousedown: this.checkFocus.bind(this), onclick: this.setFocus.bind(this) }, [m('div', { id: 'chat-header' }, [m('h2', 'PushEdx Chat')]), m('input', {
                            type: 'text',
                            id: 'chat-input',
                            onfocus: this.focus.bind(this),
                            onblur: this.blur.bind(this),
                            onkeyup: this.process.bind(this)
                        }), this.status.loading ? LoadingIndicator.component({ className: 'loading Button-icon' }) : m('span'), m('div', { className: 'wrapper', config: this.scroll.bind(this), onscroll: this.disableAutoScroll.bind(this) }, [this.status.messages.map(function (o) {
                            return m('div', { className: 'message-wrapper' }, [m('span', { className: 'avatar-wrapper' }, avatar(o.user, { className: 'avatar' })), m('span', { className: 'message' }, o.message), m('div', { className: 'clear' })]);
                        })])])]);
                    }
                }, {
                    key: 'process',
                    value: function process(e) {
                        if (e.keyCode == 13 && !this.status.loading) {
                            var data = new FormData();
                            data.append('msg', e.target.value);

                            this.status.loading = true;
                            e.target.value = '';
                            m.redraw();

                            app.request({
                                method: 'POST',
                                url: app.forum.attribute('apiUrl') + '/chat/post',
                                serialize: function serialize(raw) {
                                    return raw;
                                },
                                data: data
                            }).then(this.success.bind(this), this.failure.bind(this));
                        }
                    }
                }, {
                    key: 'failure',
                    value: function failure(message) {
                        // todo show popup
                        console.log("FAIL: " + message);
                        this.status.loading = false;
                        m.redraw();
                    }
                }, {
                    key: 'success',
                    value: function success(response) {
                        var msg = response.data.id;
                        this.status.messages.push(new ChatMessage(app.session.user, msg));
                        this.status.loading = false;
                        m.redraw();
                    }
                }]);
                return ChatFrame;
            }(Component);

            _export('default', ChatFrame);
        }
    };
});;
'use strict';

System.register('pushedx/realtime-chat/main', ['flarum/extend', 'flarum/components/HeaderSecondary', 'pushedx/realtime-chat/components/ChatFrame'], function (_export, _context) {
    var extend, HeaderSecondary, ChatFrame;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsHeaderSecondary) {
            HeaderSecondary = _flarumComponentsHeaderSecondary.default;
        }, function (_pushedxRealtimeChatComponentsChatFrame) {
            ChatFrame = _pushedxRealtimeChatComponentsChatFrame.default;
        }],
        execute: function () {

            app.initializers.add('pushedx-realtime-chat', function (app) {

                var status = {
                    loading: false,
                    autoScroll: true,
                    pusher: null,
                    messages: []
                };

                /**
                 * Add the upload button to the post composer.
                 */
                extend(HeaderSecondary.prototype, 'items', function (items) {
                    var chatFrame = new ChatFrame();
                    chatFrame.status = status;
                    items.add('pushedx-chat-frame', chatFrame);
                });
            });
        }
    };
});