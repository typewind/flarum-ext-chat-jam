module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/components/ChatAvatar.js":
/*!********************************************!*\
  !*** ./src/forum/components/ChatAvatar.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatAvatar; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2__);




var ChatAvatar =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatAvatar, _Component);

  function ChatAvatar() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatAvatar.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.model = this.attrs.model;
  };

  _proto.componentAvatarPM = function componentAvatarPM() {
    return m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2___default()({
        avatar: true,
        image: this.model.avatarUrl()
      }),
      style: {
        'background-color': this.model.color(),
        color: this.model.textColor(),
        'background-image': this.model.avatarUrl() ? "url(" + this.model.avatarUrl() + ")" : null
      }
    }, this.model.icon() ? m("i", {
      "class": this.model.icon()
    }) : this.model.avatarUrl() ? null : this.firstLetter(this.model.title()).toUpperCase());
  };

  _proto.componentAvatarChannel = function componentAvatarChannel() {
    return m("div", {
      className: "avatar",
      style: {
        'background-color': this.model.color(),
        color: this.model.textColor()
      }
    }, this.model.icon() ? m("i", {
      "class": this.model.icon()
    }) : this.model.avatarUrl() ? null : this.firstLetter(this.model.title()).toUpperCase());
  };

  _proto.view = function view(vnode) {
    return this.model.type() == 1 ? this.componentAvatarChannel() : this.componentAvatarPM();
  };

  _proto.firstLetter = function firstLetter(string) {
    for (var i = 0; i < string.length; i++) {
      if (this.isLetter(string[i])) return string[i];
    }

    return string[0];
  };

  _proto.isLetter = function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  };

  return ChatAvatar;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ChatCreateModal.js":
/*!*************************************************!*\
  !*** ./src/forum/components/ChatCreateModal.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatCreateModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ChatSearchUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatSearchUser */ "./src/forum/components/ChatSearchUser.js");
/* harmony import */ var _ChatModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChatModal */ "./src/forum/components/ChatModal.js");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");








var ChatCreateModal =
/*#__PURE__*/
function (_ChatModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatCreateModal, _ChatModal);

  function ChatCreateModal() {
    return _ChatModal.apply(this, arguments) || this;
  }

  var _proto = ChatCreateModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _ChatModal.prototype.oninit.call(this, vnode);

    this.isChannel = false;
  };

  _proto.title = function title() {
    return app.translator.trans('pushedx-chat.forum.chat.list.add_modal.title');
  };

  _proto.onsubmit = function onsubmit() {
    app.store.createRecord('chats').save({
      title: this.getInput().title(),
      isChannel: this.isChannel,
      icon: this.getInput().icon(),
      color: this.getInput().color(),
      relationships: {
        users: this.getSelectedUsers()
      }
    }).then(function (model) {
      _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].addChat(model);
      _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].onChatChanged(model);
      m.redraw();
    });
    this.hide();
  };

  _proto.componentFormInputColor = function componentFormInputColor() {
    return this.componentFormColor({
      title: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.color'),
      desc: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.color.validator'),
      stream: this.getInput().color,
      placeholder: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.color')
    });
  };

  _proto.componentFormInputIcon = function componentFormInputIcon() {
    return this.componentFormIcon({
      title: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.icon'),
      desc: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.icon.validator', {
        a: m("a", {
          href: "https://fontawesome.com/icons?m=free",
          tabindex: "-1"
        })
      }),
      stream: this.getInput().icon,
      placeholder: 'fas fa-bolt'
    });
  };

  _proto.componentFormChat = function componentFormChat() {
    return [this.usersSelected.length > 1 ? [this.componentFormInput({
      title: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.chat'),
      desc: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.validator'),
      stream: this.getInput().title,
      placeholder: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.chat')
    }), this.componentFormInputColor(), this.componentFormInputIcon()] : null, this.componentFormUsersSelect()];
  };

  _proto.componentFormChannel = function componentFormChannel() {
    return [this.componentFormInput({
      title: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.channel'),
      desc: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.validator'),
      stream: this.getInput().title,
      placeholder: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.channel')
    }), this.componentFormInputColor(), this.componentFormInputIcon()];
  };

  _proto.isCanCreateChat = function isCanCreateChat() {
    if (this.getSelectedUsers().length > 1 && !this.getInput().title().length) return false;
    if (!this.getSelectedUsers().length) return false;
    if (this.alertText()) return false;
    return true;
  };

  _proto.isCanCreateChannel = function isCanCreateChannel() {
    return this.getInput().title().length;
  };

  _proto.content = function content() {
    var _this = this;

    return m("div", {
      className: "Modal-body Modal-body--neonchat"
    }, m("div", {
      "class": "Form-group InputTitle"
    }, m("div", {
      className: "ChatType"
    }, m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2___default()({
        'Tab Tab--left': true,
        'Tab--active': !this.isChannel
      }),
      onclick: function () {
        return _this.isChannel = false;
      }.bind(this)
    }, app.translator.trans('pushedx-chat.forum.chat.list.add_modal.chat')), m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_2___default()({
        'Tab Tab--right': true,
        'Tab--active': this.isChannel
      }),
      onclick: function () {
        return _this.isChannel = true;
      }.bind(this)
    }, app.translator.trans('pushedx-chat.forum.chat.list.add_modal.channel'))), this.isChannel ? this.componentFormChannel() : this.componentFormChat(), m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: "Button Button--primary Button--block ButtonCreate",
      disabled: this.isChannel ? !this.isCanCreateChannel() : !this.isCanCreateChat(),
      onclick: this.onsubmit.bind(this)
    }, app.translator.trans('pushedx-chat.forum.chat.list.add_modal.create.chat'))));
  };

  return ChatCreateModal;
}(_ChatModal__WEBPACK_IMPORTED_MODULE_4__["default"]);



/***/ }),

/***/ "./src/forum/components/ChatEditModal.js":
/*!***********************************************!*\
  !*** ./src/forum/components/ChatEditModal.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatEditModal; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ChatModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ChatModal */ "./src/forum/components/ChatModal.js");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__);








var ChatEditModal =
/*#__PURE__*/
function (_ChatModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ChatEditModal, _ChatModal);

  function ChatEditModal() {
    return _ChatModal.apply(this, arguments) || this;
  }

  var _proto = ChatEditModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _ChatModal.prototype.oninit.call(this, vnode);

    this.getInput().title = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.model.title());
    this.getInput().color = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.model.color());
    this.getInput().icon = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.model.icon());
    this.setSelectedUsers(this.model.users());
    this.edited = {};
  };

  _proto.title = function title() {
    return app.translator.trans('pushedx-chat.forum.chat.edit_modal.title');
  };

  _proto.onsubmit = function onsubmit() {
    var _this = this;

    var added = this.getSelectedUsers().map(function (mdl) {
      return !_this.model.users().includes(mdl) ? mdl : null;
    }).filter(function (e) {
      return e;
    });
    var removed = this.model.users().map(function (mdl) {
      return !_this.getSelectedUsers().includes(mdl) ? mdl : null;
    }).filter(function (e) {
      return e;
    });
    var edited = Object.keys(this.edited).map(function (k) {
      return _this.edited[k] = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        id: k
      }, _this.edited[k]);
    });
    this.model.save({
      title: this.getInput().title(),
      color: this.getInput().color(),
      icon: this.getInput().icon(),
      users: {
        added: added,
        removed: removed,
        edited: edited
      },
      relationships: {
        users: this.getSelectedUsers()
      }
    });
    this.hide();
  };

  _proto.alertText = function alertText() {
    return null;
  };

  _proto.isModer = function isModer(user) {
    var _ref, _this$edited$user$id;

    return (_ref = (_this$edited$user$id = this.edited[user.id()]) == null ? void 0 : _this$edited$user$id.role) != null ? _ref : user.chat_pivot(this.model.id()).role() == 1;
  };

  _proto.isCreator = function isCreator(user) {
    return user.chat_pivot(this.model.id()).role() == 2;
  };

  _proto.userMentionClassname = function userMentionClassname(user) {
    return flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default()({
      editable: true,
      moder: this.isModer(user),
      creator: this.isCreator(user)
    });
  };

  _proto.userMentionDropdownOnclick = function userMentionDropdownOnclick(user, button) {
    switch (button) {
      case 'moder':
        {
          if (this.isModer(user)) this.edited[user.id()] = {
            role: 0
          };else this.edited[user.id()] = {
            role: 1
          };
          break;
        }

      case 'kick':
        {
          this.getSelectedUsers().splice(this.getSelectedUsers().indexOf(user), 1);
          break;
        }
    }
  };

  _proto.userMentionContent = function userMentionContent(user) {
    return ['@' + user.displayName(), m(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
      buttonClassName: "Button Button--icon Button--flat Button--mention-edit",
      menuClassName: "Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right",
      icon: "fas fa-chevron-down"
    }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      icon: this.isModer(user) ? 'fas fa-times' : 'fas fa-users-cog',
      onclick: this.userMentionDropdownOnclick.bind(this, user, 'moder'),
      disabled: user == app.session.user
    }, app.translator.trans('pushedx-chat.forum.chat.moder')), m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      icon: "fas fa-trash-alt",
      onclick: this.userMentionDropdownOnclick.bind(this, user, 'kick')
    }, app.translator.trans('pushedx-chat.forum.chat.kick')))];
  };

  _proto.userMentionOnClick = function userMentionOnClick(user, e) {
    this.$(e.target).find('.Dropdown').trigger('shown.bs.dropdown');
  };

  _proto.componentFormInputIcon = function componentFormInputIcon() {
    return this.componentFormIcon({
      title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.icon'),
      desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.icon.validator', {
        a: m("a", {
          href: "https://fontawesome.com/icons?m=free",
          tabindex: "-1"
        })
      }),
      stream: this.getInput().icon,
      placeholder: 'fas fa-bolt'
    });
  };

  _proto.componentFormInputTitle = function componentFormInputTitle() {
    return this.componentFormInput({
      title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title'),
      desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title.validator'),
      stream: this.getInput().title,
      placeholder: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title')
    });
  };

  _proto.componentFormInputColor = function componentFormInputColor() {
    return this.componentFormColor({
      title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color'),
      desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color.validator'),
      stream: this.getInput().color,
      placeholder: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color')
    });
  };

  _proto.componentFormPM = function componentFormPM() {
    return [];
  };

  _proto.componentFormChannel = function componentFormChannel() {
    return [this.componentFormInputTitle(), this.componentFormInputColor(), this.componentFormInputIcon(), this.componentFormUsersSelect('pushedx-chat.forum.chat.edit_modal.form.users.edit')];
  };

  _proto.componentFormChat = function componentFormChat() {
    return [this.componentFormInputTitle(), this.componentFormInputColor(), this.componentFormInputIcon(), this.componentFormUsersSelect()];
  };

  _proto.componentForm = function componentForm() {
    if (this.model.type()) return this.componentFormChannel();
    if (this.model.users().length == 2) return this.componentFormPM();
    return this.componentFormChat();
  };

  _proto.isCanEditChannel = function isCanEditChannel() {
    return this.getInput().title().length;
  };

  _proto.isCanEditChat = function isCanEditChat() {
    if (this.alertText()) return false;
    return true;
  };

  _proto.content = function content() {
    return m("div", {
      className: "Modal-body Modal-body--neonchat"
    }, m("div", {
      "class": "Form-group InputTitle"
    }, this.componentForm(), m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: "Button Button--primary Button--block ButtonCreate",
      onclick: this.onsubmit.bind(this),
      disabled: this.model.type() ? !this.isCanEditChannel() : !this.isCanEditChat()
    }, app.translator.trans('pushedx-chat.forum.chat.edit_modal.save_button'))));
  };

  return ChatEditModal;
}(_ChatModal__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/forum/components/ChatEventMessage.js":
/*!**************************************************!*\
  !*** ./src/forum/components/ChatEventMessage.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatEventMessage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChatMessage */ "./src/forum/components/ChatMessage.js");
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Link */ "flarum/components/Link");
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/humanTime */ "flarum/utils/humanTime");
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/fullTime */ "flarum/helpers/fullTime");
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_5__);







var ChatEventMessage =
/*#__PURE__*/
function (_ChatMessage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatEventMessage, _ChatMessage);

  function ChatEventMessage() {
    return _ChatMessage.apply(this, arguments) || this;
  }

  var _proto = ChatEventMessage.prototype;

  _proto.oninit = function oninit(vnode) {
    _ChatMessage.prototype.oninit.call(this, vnode);

    if (this.model.message()[0] == '*') this.parsedContent = {
      id: 'chatCensored'
    };else this.parsedContent = JSON.parse(this.model.message());
  };

  _proto.componentUserMention = function componentUserMention(user) {
    return m(flarum_components_Link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: app.route.user(user)
    }, m("span", {
      className: "UserMention"
    }, user.displayName()));
  };

  _proto.componentEventText = function componentEventText() {
    var _this = this;

    switch (this.parsedContent.id) {
      case 'chatCensored':
        {
          return m("div", {
            className: "censored"
          }, this.model.message());
        }

      case 'chatCreated':
        {
          var transKey = 'chat';
          if (this.parsedContent.users.length == 1) transKey = 'pm';else if (this.model.chat().type() == 1) transKey = 'channel';
          return app.translator.trans("pushedx-chat.forum.chat.message.events." + transKey + ".created", {
            creatorname: this.componentUserMention(this.model.user()),
            chatname: m("b", {
              className: "chat-title"
            }, this.model.chat().title()),
            usernames: this.parsedContent.users.map(function (user_id) {
              return _this.componentUserMention(app.store.getById('users', user_id));
            }),
            username: this.parsedContent.users.length ? this.componentUserMention(app.store.getById('users', this.parsedContent.users[0])) : null
          });
        }

      case 'chatEdited':
        {
          var componentOld, componentNew;

          switch (this.parsedContent.column) {
            case 'title':
              componentOld = m("b", {
                className: "chat-title"
              }, this.parsedContent.old);
              componentNew = m("b", {
                className: "chat-title"
              }, this.parsedContent["new"]);
              break;

            case 'color':
              componentOld = m("i", {
                className: "fas fa-circle",
                style: {
                  color: this.parsedContent.old
                }
              });
              componentNew = m("i", {
                className: "fas fa-circle",
                style: {
                  color: this.parsedContent["new"]
                }
              });
              break;

            case 'icon':
              componentOld = this.parsedContent.old ? m("i", {
                className: this.parsedContent.old
              }) : m("b", null, "[nothing]");
              componentNew = m("i", {
                className: this.parsedContent["new"]
              });
              break;
          }

          return app.translator.trans("pushedx-chat.forum.chat.message.events." + this.parsedContent.column + ".edited", {
            editorname: this.componentUserMention(this.model.user()),
            old: componentOld,
            "new": componentNew
          });
        }
    }
  };

  _proto.content = function content() {
    return m("div", {
      className: "event"
    }, this.componentEventText(), m("a", {
      className: "timestamp",
      title: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_5___default()(this.model.created_at()))
    }, this.humanTime = flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_4___default()(this.model.created_at())));
  };

  return ChatEventMessage;
}(_ChatMessage__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/forum/components/ChatFrame.js":
/*!*******************************************!*\
  !*** ./src/forum/components/ChatFrame.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatFrame; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ChatWelcome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChatWelcome */ "./src/forum/components/ChatWelcome.js");
/* harmony import */ var _ChatCreateModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatCreateModal */ "./src/forum/components/ChatCreateModal.js");
/* harmony import */ var _ChatEditModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChatEditModal */ "./src/forum/components/ChatEditModal.js");
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");







var ChatFrame =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatFrame, _Component);

  function ChatFrame() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatFrame.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    if ('Notification' in window && _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('notify')) Notification.requestPermission();
    setInterval(function () {
      return m.redraw();
    }, 30000);
    document.addEventListener('mousedown', this.chatMoveListener.bind(this, 'mousedown'));
    document.addEventListener('mouseup', this.chatMoveListener.bind(this, 'mouseup'));

    if (!app.pusher) {
      alert('Please enable Pusher/WebSocket to use Neon Chat!');
      return;
    }

    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiFetchChats();
  };

  _proto.getChat = function getChat() {
    return document.querySelector('.neonchat');
  };

  _proto.getChatFrame = function getChatFrame() {
    return document.querySelector('.neonchat #chat');
  };

  _proto.getChatHeader = function getChatHeader() {
    return document.querySelector('.neonchat #chat-header');
  };

  _proto.getChatWrapper = function getChatWrapper() {
    return document.querySelector('.neonchat .wrapper');
  };

  _proto.getChatViewport = function getChatViewport() {
    return document.querySelector('.neonchat #chat-viewport');
  };

  _proto.getChatsListPanel = function getChatsListPanel() {
    return document.querySelector('.neonchat #chats-list');
  };

  _proto.getChatsList = function getChatsList() {
    return document.querySelector('.neonchat #chats-list .list');
  };

  _proto.toggleChat = function toggleChat(e) {
    var chat = this.getChat();
    var classes = chat.className;
    var showing = false;

    if (chat.classList.contains('hidden')) {
      chat.classList.remove('hidden');
      showing = true;
    } else chat.classList.add('hidden');

    chat.className = classes;
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].saveFrameState('beingShown', showing);
  };

  _proto.toggleChatsList = function toggleChatsList(e) {
    var chatLists = this.getChatsListPanel();
    var showing = true;

    if (chatLists.classList.contains('toggled')) {
      chatLists.classList.remove('toggled');
      showing = false;
    } else chatLists.classList.add('toggled');

    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].saveFrameState('beingShownChatsList', showing);
  };

  _proto.toggleSound = function toggleSound(e) {
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].saveFrameState('isMuted', !_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('isMuted'));
    e.preventDefault();
    e.stopPropagation();
  };

  _proto.toggleNotifications = function toggleNotifications(e) {
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].saveFrameState('notify', !_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('notify'));
    if ('Notification' in window && _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('notify')) Notification.requestPermission();
    e.preventDefault();
    e.stopPropagation();
  };

  _proto.view = function view(vnode) {
    var _ChatState$componentC;

    return m("div", {
      className: 'neonchat left container ' + (_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('beingShown') ? '' : 'hidden'),
      style: {
        right: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('transform').x + 'px'
      }
    }, m("div", {
      tabindex: "0",
      className: "frame",
      id: "chat"
    }, m("div", {
      id: "chats-list",
      className: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('beingShownChatsList') ? 'toggled' : ''
    }, m("div", {
      className: "header"
    }, m("div", {
      className: "input-wrapper"
    }, m("textarea", {
      id: "chat-find",
      placeholder: app.translator.trans('pushedx-chat.forum.chat.list.placeholder')
    })), m("div", {
      className: "icon icon-toggle",
      onclick: this.toggleChatsList.bind(this),
      "data-title": app.translator.trans('pushedx-chat.forum.chat.list.' + (_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('beingShownChatsList') ? 'unpin' : 'pin'))
    }, m("i", {
      className: "fas fa-paperclip"
    }))), m("div", {
      className: "list",
      style: {
        'max-height': _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('transform').y + 'px'
      }
    }, _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].componentsChats(), app.session.user ? m("div", {
      "class": "panel-add",
      onclick: function onclick() {
        return app.modal.show(_ChatCreateModal__WEBPACK_IMPORTED_MODULE_3__["default"]);
      }
    }) : null)), m("div", {
      id: "chat-panel"
    }, m("div", {
      id: "chat-header",
      ondragstart: function ondragstart() {
        return false;
      },
      onmousedown: this.chatHeaderOnMouseDown.bind(this)
    }, m("h2", null, _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat() ? [_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat().icon() ? m("i", {
      "class": _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat().icon(),
      style: {
        color: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat().color(),
        'margin-right': '3px'
      }
    }) : null, _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat().title()] : app.translator.trans('pushedx-chat.forum.toolbar.title')), !_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat() ? null : m("div", {
      className: "icon",
      "data-title": app.translator.trans('pushedx-chat.forum.toolbar.chat.settings'),
      onclick: function onclick() {
        return app.modal.show(_ChatEditModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          model: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getCurrentChat()
        });
      }
    }, m("i", {
      className: "fas fa-cog"
    })), m("div", {
      className: "window-buttons"
    }, m("div", {
      className: "icon",
      onclick: this.toggleSound.bind(this),
      "data-title": app.translator.trans('pushedx-chat.forum.toolbar.' + (_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('isMuted') ? 'enable_sounds' : 'disable_sounds'))
    }, m("i", {
      className: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('isMuted') ? 'fas fa-volume-mute' : 'fas fa-volume-up'
    })), m("div", {
      className: "icon",
      onclick: this.toggleNotifications.bind(this),
      "data-title": app.translator.trans('pushedx-chat.forum.toolbar.' + (_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('notify') ? 'disable_notifications' : 'enable_notifications'))
    }, m("i", {
      className: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('notify') ? 'fas fa-bell' : 'fas fa-bell-slash'
    })), m("div", {
      className: "icon",
      onclick: this.toggleChat.bind(this),
      "data-title": app.translator.trans('pushedx-chat.forum.toolbar.' + (_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('beingShown') ? 'minimize' : 'maximize'))
    }, m("i", {
      className: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('beingShown') ? 'fas fa-window-minimize' : 'fas fa-window-maximize'
    })))), m("div", {
      id: "chat-viewport"
    }, (_ChatState$componentC = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].componentCurViewport()) != null ? _ChatState$componentC : m(_ChatWelcome__WEBPACK_IMPORTED_MODULE_2__["default"], null)))));
  };

  _proto.tooltip = function tooltip(vnode) {
    $(vnode.dom).tooltip('fixTitle');
  };

  _proto.chatHeaderOnMouseDown = function chatHeaderOnMouseDown(e) {
    for (var i = 0, el; i < e.path.length; i++) {
      el = e.path[i];
      if (el.classList && el.classList.contains('icon')) return;
    }

    if (!this.chatMoveStart(e)) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  _proto.chatMoveListener = function chatMoveListener(event, e) {
    switch (event) {
      case 'mouseup':
        {
          if (this.chatMoving) this.chatMoveEnd(e);
          break;
        }
    }
  };

  _proto.chatMoveStart = function chatMoveStart(e) {
    this.chatMoving = true;
    this.mouseMoveEvent = this.chatMoveProcess.bind(this);
    this.moveLast = {
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener('mousemove', this.mouseMoveEvent);
    document.body.classList.add('moving');
    return false;
  };

  _proto.chatMoveEnd = function chatMoveEnd(e) {
    this.chatMoving = false;
    document.removeEventListener('mousemove', this.mouseMoveEvent);
    document.body.classList.remove('moving');
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].saveFrameState('transform', {
      x: parseInt(this.getChat().style.right),
      y: this.getChatWrapper().offsetHeight
    });
  };

  _proto.chatMoveProcess = function chatMoveProcess(e) {
    var chat = this.getChat();
    var chatWrapper = this.getChatWrapper();
    var move = {
      x: e.clientX - this.moveLast.x,
      y: e.clientY - this.moveLast.y
    };
    var right = parseInt(chat.style.right) || 0;
    var wrapperHeight = chatWrapper.offsetHeight;
    var nextPos = {
      x: right - move.x,
      y: wrapperHeight - move.y
    };
    if (nextPos.x < window.innerWidth - this.getChatFrame().offsetWidth && move.x < 0 || nextPos.x > 0 && move.x > 0) chat.style.right = nextPos.x + 'px';

    if (0 < nextPos.y && nextPos.y < window.innerHeight - 100) {
      chatWrapper.style.height = nextPos.y + 'px';
      this.getChatsList().style.maxHeight = this.getChatViewport().scrollHeight + 'px';
      chatWrapper.scrollTop += move.y;
    }

    this.moveLast = {
      x: e.clientX,
      y: e.clientY
    };
  };

  return ChatFrame;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ChatMessage.js":
/*!*********************************************!*\
  !*** ./src/forum/components/ChatMessage.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatMessage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/avatar */ "flarum/helpers/avatar");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/helpers/fullTime */ "flarum/helpers/fullTime");
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/humanTime */ "flarum/utils/humanTime");
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/utils/SubtreeRetainer */ "flarum/utils/SubtreeRetainer");
/* harmony import */ var flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_components_Separator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/components/Separator */ "flarum/components/Separator");
/* harmony import */ var flarum_components_Separator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Separator__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flarum/components/Link */ "flarum/components/Link");
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Link__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");
















var ChatMessage =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatMessage, _Component);

  function ChatMessage() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatMessage.prototype;

  _proto.oninit = function oninit(vnode) {
    var _this = this;

    _Component.prototype.oninit.call(this, vnode);

    this.labels = [];
    this.model = this.attrs.model;
    if (!this.model.content) this.model.content = this.model.message();
    this.initLabels();
    this.subtree = new flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_9___default.a(function () {
      return _this.model.freshness;
    }, function () {
      return _this.model.user().freshness;
    }, function () {
      return _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getCurrentChat();
    }, // Reactive attrs
    function () {
      return _this.model.content;
    }, function () {
      return _this.model.isDeletedForever;
    }, function () {
      return _this.model.isTimedOut;
    }, function () {
      return _this.model.isEditing;
    }, function () {
      return _this.model.isNeedToFlash;
    });
  };

  _proto.modelEvent = function modelEvent(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].evented.trigger('onClickMessage', name, this.model, args);
  };

  _proto.onbeforeupdate = function onbeforeupdate(vnode) {
    _Component.prototype.onbeforeupdate.call(this, vnode);

    this.model = this.attrs.model;
    return this.subtree.needsRebuild();
  };

  _proto.content = function content() {
    return m("div", null, this.model.user() ? m(flarum_components_Link__WEBPACK_IMPORTED_MODULE_13___default.a, {
      className: "avatar-wrapper",
      href: app.route.user(this.model.user())
    }, m("span", null, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2___default()(this.model.user(), {
      className: 'avatar'
    }))) : m("div", {
      className: "avatar-wrapper"
    }, m("span", null, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2___default()(this.model.user(), {
      className: 'avatar'
    }))), m("div", {
      className: "message-block"
    }, m("div", {
      className: "toolbar"
    }, m("a", {
      className: "name",
      onclick: this.modelEvent.bind(this, 'insertMention')
    }, flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3___default()(this.model.user())) + ': '), m("div", {
      className: "labels"
    }, this.labels.map(function (label) {
      return label.condition() ? label.component() : null;
    })), m("div", {
      className: "right"
    }, this.model.id() ? [this.model.isDeletedForever ? null : this.editDropDown(), m("a", {
      className: "timestamp",
      title: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_4___default()(this.model.created_at()))
    }, this.humanTime = flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_6___default()(this.model.created_at()))] : this.model.isTimedOut ? this.editDropDownTimedOut() : null)), m("div", {
      className: "message"
    }, this.model.is_censored() ? m("div", {
      className: "censored",
      title: app.translator.trans('pushedx-chat.forum.chat.message.censored')
    }, this.model.content) : m("div", {
      oncreate: this.onContentWrapperCreated.bind(this),
      onupdate: this.onContentWrapperUpdated.bind(this)
    }))));
  };

  _proto.view = function view(vnode) {
    return m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default()({
        'message-wrapper': true,
        hidden: this.model.deleted_by(),
        editing: this.model.isEditing,
        deleted: !this.isVisible()
      }),
      "data-id": this.model.id()
    }, this.content());
  };

  _proto.initLabels = function initLabels() {
    var _this2 = this;

    this.labelBind(function () {
      return _this2.model.edited_at();
    }, function () {
      return m("div", {
        "class": "icon",
        title: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(app.translator.trans('core.forum.post.edited_tooltip', {
          user: _this2.model.user(),
          ago: flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_6___default()(_this2.model.edited_at())
        }))
      }, m("i", {
        "class": "fas fa-pencil-alt"
      }));
    });
    this.labelBind(function () {
      return _this2.model.deleted_by();
    }, function () {
      return m("div", {
        "class": "icon"
      }, m("i", {
        "class": "fas fa-trash-alt"
      }), " ", m("span", null, "(" + app.translator.trans('pushedx-chat.forum.chat.message.deleted' + (_this2.model.isDeletedForever ? '_forever' : '')), " ", flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3___default()(_this2.model.deleted_by()), ")"));
    });
    this.labelBind(function () {
      return _this2.model.isTimedOut;
    }, function () {
      return m("div", {
        "class": "icon",
        style: "color: #ff4063"
      }, m("i", {
        "class": "fas fa-exclamation-circle"
      }));
    });
  };

  _proto.labelBind = function labelBind(condition, component) {
    this.labels.push({
      condition: condition,
      component: component
    });
  };

  _proto.editDropDown = function editDropDown() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default.a();

    if (_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions().edit && this.model.user() && this.model.user() == app.session.user) {
      items.add('dropdownEditStart', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onclick: this.modelEvent.bind(this, 'dropdownEditStart'),
        icon: "fas fa-pencil-alt",
        disabled: this.model.deleted_by() || this.model.isEditing
      }, app.translator.trans('core.forum.post_controls.edit_button')));
    }

    items.add('separator', m(flarum_components_Separator__WEBPACK_IMPORTED_MODULE_12___default.a, null));

    if (_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions().moderate["delete"] || _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions()["delete"] && this.model.user() == app.session.user) {
      if (this.model.deleted_by()) {
        items.add('dropdownRestore', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
          onclick: this.modelEvent.bind(this, 'dropdownRestore'),
          icon: "fas fa-reply",
          disabled: !_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions().moderate["delete"] && this.model.deleted_by() != app.session.user
        }, app.translator.trans('core.forum.post_controls.restore_button')));
      } else {
        items.add('dropdownHide', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
          onclick: this.modelEvent.bind(this, 'dropdownHide'),
          icon: "fas fa-trash-alt",
          disabled: this.model.isEditing
        }, app.translator.trans('core.forum.post_controls.delete_button')));
      }
    }

    if (_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions().moderate["delete"] && (this.model.deleted_by() || _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].totalHidden() >= 3)) {
      items.add('dropdownDelete', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onclick: this.modelEvent.bind(this, 'dropdownDelete'),
        icon: "fas fa-trash-alt",
        disabled: !_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions()["delete"]
      }, app.translator.trans('core.forum.post_controls.delete_forever_button')));
    }

    return Object.keys(items.items).length <= 1 ? null : m("div", {
      className: "edit"
    }, m(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_10___default.a, {
      buttonClassName: "Button Button--icon Button--flat",
      menuClassName: "Dropdown-menu Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right",
      icon: "fas fa-ellipsis-h"
    }, items.toArray()));
  };

  _proto.editDropDownTimedOut = function editDropDownTimedOut() {
    return m("div", {
      className: "edit"
    }, m(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_10___default.a, {
      buttonClassName: "Button Button--icon Button--flat",
      menuClassName: "Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right",
      icon: "fas fa-ellipsis-h"
    }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
      onclick: this.modelEvent.bind(this, 'dropdownDelete'),
      icon: "fas fa-trash-alt"
    }, app.translator.trans('pushedx-chat.forum.chat.message.actions.hide')), m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
      onclick: this.modelEvent.bind(this, 'dropdownResend'),
      icon: "fas fa-reply"
    }, app.translator.trans('pushedx-chat.forum.chat.message.actions.resend'))));
  };

  _proto.oncreate = function oncreate(vnode) {
    _Component.prototype.oncreate.call(this, vnode);

    this.messageWrapper = vnode.dom;
  };

  _proto.onContentWrapperUpdated = function onContentWrapperUpdated(vnode) {
    this.renderMessage(vnode);
  };

  _proto.onContentWrapperCreated = function onContentWrapperCreated(vnode) {
    this.renderMessage(vnode);
  };

  _proto.renderMessage = function renderMessage(vnode) {
    var element = vnode.dom;

    if (this.model.isNeedToFlash) {
      _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].flashItem($(this.messageWrapper));
      this.model.isNeedToFlash = false;
    }

    if (this.model.content !== this.oldContent) {
      this.oldContent = this.model.content;
      _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].renderChatMessage(element, this.model.content);
    }
  };

  _proto.isVisible = function isVisible() {
    if (this.model.chat() != _states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getCurrentChat()) return false;
    if (this.model.isDeletedForever
    /*&& (!ChatState.getPermissions().moderate.vision || !this.model.id())*/
    ) return false;
    if (this.model.deleted_by() && !(_states_ChatState__WEBPACK_IMPORTED_MODULE_14__["default"].getPermissions().moderate.vision || this.model.user() == app.session.user)) return false;
    return true;
  };

  return ChatMessage;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ChatModal.js":
/*!*******************************************!*\
  !*** ./src/forum/components/ChatModal.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ChatSearchUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChatSearchUser */ "./src/forum/components/ChatSearchUser.js");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");







var ChatModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatModal, _Modal);

  function ChatModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = ChatModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.model = this.attrs.model;
    app.search.neonchat = {
      usersSelected: []
    };
    this.usersSelected = app.search.neonchat.usersSelected;
    this.input = {
      title: flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(''),
      color: flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(''),
      icon: flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()('')
    };
  };

  _proto.onremove = function onremove(vnode) {
    app.search.neonchat = null;
  };

  _proto.getInput = function getInput() {
    return this.input;
  };

  _proto.setSelectedUsers = function setSelectedUsers(users) {
    app.search.neonchat.usersSelected = users;
    this.usersSelected = app.search.neonchat.usersSelected;
  };

  _proto.getSelectedUsers = function getSelectedUsers() {
    return this.usersSelected;
  };

  _proto.className = function className() {
    return 'Modal--small';
  };

  _proto.isChatExists = function isChatExists() {
    return this.getSelectedUsers().length == 1 && _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].isExistsPMChat(app.session.user, this.getSelectedUsers()[0]);
  };

  _proto.alertText = function alertText() {
    if (this.isChatExists()) return app.translator.trans('pushedx-chat.forum.chat.list.add_modal.alerts.exists');
    return null;
  };

  _proto.componentAlert = function componentAlert() {
    return !this.alertText() ? null : m("div", {
      className: "Alert"
    }, this.alertText());
  };

  _proto.componentFormUsersSelect = function componentFormUsersSelect(label) {
    if (label === void 0) {
      label = 'pushedx-chat.forum.chat.list.add_modal.form.users';
    }

    return [m("label", null, app.translator.trans(label)), this.componentUsersSelect()];
  };

  _proto.userMentionContent = function userMentionContent(user) {
    return '@' + user.displayName();
  };

  _proto.userMentionClassname = function userMentionClassname(user) {
    return 'deletable';
  };

  _proto.userMentionOnClick = function userMentionOnClick(event, user) {
    return this.getSelectedUsers().splice(this.getSelectedUsers().indexOf(user), 1);
  };

  _proto.componentUsersSelect = function componentUsersSelect() {
    var _this = this;

    return [this.componentAlert(), m("div", {
      className: "UsersTags"
    }, this.getSelectedUsers().map(function (u) {
      return m("div", {
        className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default()(['UserMention', _this.userMentionClassname(u)]),
        onclick: _this.userMentionOnClick.bind(_this, u)
      }, _this.userMentionContent(u));
    })), m("div", {
      className: "UsersSearch"
    }, m(_ChatSearchUser__WEBPACK_IMPORTED_MODULE_2__["default"], {
      state: app.search
    }))];
  };

  _proto.componentFormIcon = function componentFormIcon(options) {
    var _this2 = this,
        _this$input$icon;

    return [options.title ? m("label", null, options.title) : null, m("div", null, options.desc ? m("label", null, options.desc) : null, m("div", {
      className: "Icon-Input"
    }, m("input", {
      "class": "FormControl",
      type: "text",
      bidi: options.stream,
      placeholder: options.placeholder,
      onupdate: function onupdate(vnode) {
        return $('.Chat-FullColor').css({
          color: _this2.input.color(),
          backgroundColor: _this2.input.color()
        });
      }
    }), m("icon", {
      className: "Chat-FullColor"
    }, m("i", {
      className: ((_this$input$icon = this.input.icon()) == null ? void 0 : _this$input$icon.length) ? this.input.icon() : 'fas fa-bolt'
    }))))];
  };

  _proto.componentFormColor = function componentFormColor(options) {
    var _this3 = this;

    return [options.title ? m("label", null, options.title) : null, m("div", null, options.desc ? m("label", null, options.desc) : null, m("div", {
      className: "Color-Input"
    }, m("input", {
      "class": "FormControl",
      type: "text",
      bidi: options.stream,
      placeholder: options.placeholder,
      onupdate: function onupdate(vnode) {
        return $('.Chat-FullColor').css({
          color: _this3.input.color(),
          backgroundColor: _this3.input.color()
        });
      }
    }), m("color", {
      className: "Chat-FullColor"
    })))];
  };

  _proto.componentFormInput = function componentFormInput(options) {
    return [options.title ? m("label", null, options.title) : null, m("div", null, options.desc ? m("label", null, options.desc) : null, m("input", {
      "class": "FormControl",
      type: "text",
      bidi: options.stream,
      placeholder: options.placeholder
    }))];
  };

  return ChatModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ChatPreview.js":
/*!*********************************************!*\
  !*** ./src/forum/components/ChatPreview.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatPreview; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/utils/humanTime */ "flarum/utils/humanTime");
/* harmony import */ var flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/SubtreeRetainer */ "flarum/utils/SubtreeRetainer");
/* harmony import */ var flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");
/* harmony import */ var _ChatAvatar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ChatAvatar */ "./src/forum/components/ChatAvatar.js");









var ChatPreview =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatPreview, _Component);

  function ChatPreview() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatPreview.prototype;

  _proto.oninit = function oninit(vnode) {
    var _this = this;

    _Component.prototype.oninit.call(this, vnode);

    this.model = this.attrs.model;
    this.subtree = new flarum_utils_SubtreeRetainer__WEBPACK_IMPORTED_MODULE_5___default.a(function () {
      return _this.model.freshness;
    }, function () {
      return _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].getCurrentChat();
    }, // Reactive attrs
    function () {
      return _this.model.isNeedToFlash;
    });
  };

  _proto.onbeforeupdate = function onbeforeupdate(vnode) {
    _Component.prototype.onbeforeupdate.call(this, vnode);

    this.model = this.attrs.model;
    return this.subtree.needsRebuild();
  };

  _proto.view = function view(vnode) {
    return m("div", {
      style: {
        position: 'relative'
      }
    }, m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_3___default()({
        'panel-preview': true,
        'active': _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].getCurrentChat() == this.model
      })
    }, this.componentPreview()), this.model.unreaded() ? m("div", {
      className: "unreaded"
    }, this.model.unreaded()) : null);
  };

  _proto.oncreate = function oncreate(vnode) {
    if (this.model.isNeedToFlash) {
      _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].flashItem($(vnode.dom));
      this.model.isNeedToFlash = false;
    }
  };

  _proto.onupdate = function onupdate(vnode) {
    if (this.model.isNeedToFlash) {
      _states_ChatState__WEBPACK_IMPORTED_MODULE_6__["default"].flashItem($(vnode.dom));
      this.model.isNeedToFlash = false;
    }
  };

  _proto.componentMessageTime = function componentMessageTime() {
    var lastMessage = this.model.last_message();
    var time = new Date(lastMessage.created_at());
    if (Date.now() - time.getTime() < 60 * 60 * 12 * 1000) return time.toLocaleTimeString().slice(0, 5);
    return flarum_utils_humanTime__WEBPACK_IMPORTED_MODULE_1___default()(lastMessage.created_at());
  };

  _proto.componentPreview = function componentPreview() {
    return [m(_ChatAvatar__WEBPACK_IMPORTED_MODULE_7__["default"], {
      model: this.model
    }), m("div", {
      style: "display: flex; flex-direction: column"
    }, m("div", {
      className: "title",
      title: this.model.title()
    }, this.model.icon() ? m("i", {
      "class": this.model.icon(),
      style: {
        color: this.model.color()
      }
    }) : null, this.model.title()), this.model.last_message() ? this.componentTextPreview() : this.componentTextEmpty()), this.model.last_message() ? m("div", {
      className: "timestamp",
      title: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default()(this.model.last_message().created_at())
    }, this.humanTime = this.componentMessageTime()) : null];
  };

  _proto.componentPreviewChannel = function componentPreviewChannel() {
    return [m(_ChatAvatar__WEBPACK_IMPORTED_MODULE_7__["default"], {
      model: this.model
    }), m("div", {
      style: "display: flex; flex-direction: column"
    }, m("div", {
      className: "title",
      title: this.model.title()
    }, this.model.title()), this.componentTextPreview()), m("div", {
      className: "timestamp",
      title: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default()(this.model.last_message().created_at())
    }, this.humanTime = this.componentMessageTime())];
  };

  _proto.formatTextPreview = function formatTextPreview(text) {
    var type;

    if (text.startsWith('```')) {
      text = app.translator.trans('pushedx-chat.forum.chat.message.type.code');
      type = 'media';
    } else if (text.startsWith('http://') || text.startsWith('https://')) {
      text = app.translator.trans('pushedx-chat.forum.chat.message.type.url');
      type = 'media';
    }

    return {
      text: text,
      type: type
    };
  };

  _proto.componentTextPreview = function componentTextPreview() {
    var lastMessage = this.model.last_message();

    if (lastMessage.type() != 0) {
      return m("div", {
        className: "message"
      }, m("span", {
        className: "media"
      }, app.translator.trans('pushedx-chat.forum.chat.message.type.event')));
    }

    var formatResult = this.formatTextPreview(lastMessage.message());
    var senderName,
        users = this.model.users(),
        sender = lastMessage.user();

    if (app.session.user) {
      if (app.session.user.id() == sender.id()) senderName = app.translator.trans('pushedx-chat.forum.chat.message.you') + ": ";else if (users.length > 2 || this.model.type()) senderName = sender.displayName() + ': ';
    }

    return m("div", {
      className: flarum_utils_classList__WEBPACK_IMPORTED_MODULE_3___default()({
        message: true,
        censored: lastMessage.is_censored()
      }),
      title: lastMessage.is_censored() ? app.translator.trans('pushedx-chat.forum.chat.message.censored') : null
    }, m("span", {
      className: "sender"
    }, senderName), m("span", {
      className: formatResult.type
    }, formatResult.text));
  };

  _proto.componentTextEmpty = function componentTextEmpty() {
    return m("div", {
      className: "message"
    }, m("span", {
      className: "empty"
    }, app.translator.trans('pushedx-chat.forum.chat.list.preview.empty')));
  };

  return ChatPreview;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/ChatSearchUser.js":
/*!************************************************!*\
  !*** ./src/forum/components/ChatSearchUser.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatSearchUser; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Search */ "flarum/components/Search");
/* harmony import */ var flarum_components_Search__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Search__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UsersSearchResults__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UsersSearchResults */ "./src/forum/components/UsersSearchResults.js");








var ChatSearchUser =
/*#__PURE__*/
function (_Search) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatSearchUser, _Search);

  function ChatSearchUser() {
    return _Search.apply(this, arguments) || this;
  }

  var _proto = ChatSearchUser.prototype;

  _proto.oninit = function oninit(vnode) {
    _Search.prototype.oninit.call(this, vnode);
  };

  _proto.sourceItems = function sourceItems() {
    var _this$attrs$state;

    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    this.state = (_this$attrs$state = this.attrs.state) != null ? _this$attrs$state : {};
    if (app.forum.attribute('canViewUserList')) items.add('users', new _UsersSearchResults__WEBPACK_IMPORTED_MODULE_6__["default"]({
      state: app.search.neonchat
    }));
    return items;
  };

  _proto.view = function view(vnode) {
    var _this = this;

    var currentSearch = this.state.getInitialSearch();

    if (!this.state.getValue().length) {
      this.state.setValue(currentSearch || '');
    }

    app.current.searching = function () {
      return _this.state.getValue();
    };

    if (!this.sources) {
      this.sources = this.sourceItems().toArray();
    }

    if (!this.sources.length) return m("div", null);
    return m("div", {
      className: 'Search ' + flarum_utils_classList__WEBPACK_IMPORTED_MODULE_4___default()({
        open: this.hasFocus,
        active: !!currentSearch,
        loading: !!this.loadingSources
      })
    }, m("div", {
      className: "Search-input SearchInput"
    }, m("input", {
      className: "FormControl",
      type: "search",
      placeholder: app.translator.trans('pushedx-chat.forum.chat.list.add_modal.search.placeholder'),
      value: this.state.getValue(),
      oninput: function oninput(e) {
        return _this.state.setValue(e.target.value);
      },
      onfocus: function onfocus() {
        return _this.hasFocus = true;
      }
    }), this.loadingSources ? m(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default.a, {
      size: "tiny",
      className: "Button Button--icon Button--link"
    }) : currentSearch ? m("button", {
      className: "Search-clear Button Button--icon Button--link",
      onclick: this.clear.bind(this)
    }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default()('fas fa-times-circle')) : ''), this.state.getValue() && this.hasFocus ? m("ul", {
      className: "Dropdown-menu Dropdown--Users"
    }, this.sources.map(function (source) {
      return source.view(_this.state.getValue());
    })) : null);
  };

  return ChatSearchUser;
}(flarum_components_Search__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ChatViewport.js":
/*!**********************************************!*\
  !*** ./src/forum/components/ChatViewport.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatViewport; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_Message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/Message */ "./src/forum/models/Message.js");
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");







var ChatViewport =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ChatViewport, _Component);

  function ChatViewport() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatViewport.prototype;

  _proto.oninit = function oninit(vnode) {
    var _app$forum$attribute;

    _Component.prototype.oninit.call(this, vnode);

    this.model = this.attrs.model;
    this.state = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getViewportState(this.model);
    this.messageCharLimit = (_app$forum$attribute = app.forum.attribute('pushedx-chat.settings.charlimit')) != null ? _app$forum$attribute : 512;
    if (!app.session.user) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.unauthenticated');else this.inputPlaceholder = app.translator.trans(_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getPermissions().post ? 'pushedx-chat.forum.chat.placeholder' : 'pushedx-chat.forum.errors.chatdenied');
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].evented.on('onChatChanged', this.onChatChanged.bind(this));
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].evented.on('onClickMessage', this.onChatMessageClicked.bind(this));
  };

  _proto.onbeforeupdate = function onbeforeupdate(vnode) {
    _Component.prototype.onbeforeupdate.call(this, vnode);

    this.model = this.attrs.model;
    this.state = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getViewportState(this.model);
  };

  _proto.onupdate = function onupdate(vnode) {//ChatState.colorizeOddChatMessages();
  };

  _proto.view = function view(vnode) {
    return m("div", null, m("div", {
      className: "wrapper",
      oncreate: this.wrapperOnCreate.bind(this),
      onupdate: this.wrapperOnUpdate.bind(this),
      onscroll: this.wrapperOnScroll.bind(this),
      onmousewheel: this.wrapperOnMouseWheel.bind(this),
      style: {
        height: _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getFrameState('transform').y + 'px'
      }
    }, this.componentLoader(this.state.scroll.loading.all), _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].componentsChatMessages().concat(this.state.input.writingPreview ? _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].componentChatMessage(this.state.input.previewModel) : [])), m("div", {
      className: "input-wrapper"
    }, m("textarea", {
      id: "chat-input",
      maxlength: this.messageCharLimit,
      disabled: !_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getPermissions().post,
      placeholder: this.inputPlaceholder,
      onkeypress: this.inputPressEnter.bind(this),
      oninput: this.inputProcess.bind(this),
      onpaste: this.inputProcess.bind(this),
      rows: this.state.input.rows
    }), this.state.messageEditing ? m("div", {
      className: "icon edit",
      onclick: this.messageEditEnd.bind(this)
    }, m("i", {
      "class": "fas fa-times"
    })) : null, m("div", {
      className: "icon send",
      onclick: this.inputPressButton.bind(this)
    }, m("i", {
      "class": "fas fa-angle-double-right"
    })), m("div", {
      id: "chat-limitter",
      className: this.reachedLimit() ? 'reaching-limit' : '',
      style: {
        display: !_states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getPermissions().post ? 'none' : ''
      }
    }, this.messageCharLimit - (this.state.input.messageLength || 0) + '/' + this.messageCharLimit)), this.isFastScrollAvailable() ? this.componentScroller() : null);
  };

  _proto.componentScroller = function componentScroller() {
    return m("div", {
      className: "scroller",
      onclick: this.fastScroll.bind(this)
    }, m("i", {
      "class": "fas fa-angle-down"
    }));
  };

  _proto.componentLoader = function componentLoader(watch) {
    return watch ? m("msgloader", {
      className: "message-wrapper--loading"
    }, m(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: "loading-old Button-icon"
    })) : null;
  };

  _proto.getChat = function getChat() {
    return document.querySelector('.neonchat');
  };

  _proto.getChatHeader = function getChatHeader() {
    return document.querySelector('.neonchat #chat-header');
  };

  _proto.getChatInput = function getChatInput() {
    return document.querySelector('.neonchat #chat-input');
  };

  _proto.getChatsList = function getChatsList() {
    return document.querySelector('.neonchat #chats-list');
  };

  _proto.getChatWrapper = function getChatWrapper() {
    return document.querySelector('.neonchat .wrapper');
  };

  _proto.reachedLimit = function reachedLimit() {
    this.oldReached = this.messageCharLimit - (this.state.input.messageLength || 0) < 100;
    return this.oldReached;
  };

  _proto.isFastScrollAvailable = function isFastScrollAvailable() {
    var chatWrapper = this.getChatWrapper();
    return this.model.unreaded() >= 30 || chatWrapper && chatWrapper.scrollHeight > 2000 && chatWrapper.scrollTop < chatWrapper.scrollHeight - 2000;
  };

  _proto.fastScroll = function fastScroll() {
    if (this.model.unreaded() >= 30) this.fastMessagesFetch.bind(this);else {
      var chatWrapper = this.getChatWrapper();
      chatWrapper.scrollTop = Math.max(chatWrapper.scrollTop, chatWrapper.scrollHeight - 3000);
      this.scrollToBottom();
    }
  };

  _proto.fastMessagesFetch = function fastMessagesFetch(e) {
    var _this = this;

    e.redraw = false;
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].chatmessages = [];
    _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiFetchChatMessages(this.model).then(function (r) {
      _this.scrollToBottom();

      _this.timedRedraw(300);

      _this.model.pushAttributes({
        unreaded: 0
      });

      var message = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getChatMessages(function (mdl) {
        return mdl.chat() == _this.model;
      }).slice(-1)[0];
      _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiReadChat(_this.model, message);
    });
  };

  _proto.wrapperOnCreate = function wrapperOnCreate(vnode) {
    _Component.prototype.oncreate.call(this, vnode);

    this.wrapperOnUpdate(vnode);
  };

  _proto.wrapperOnUpdate = function wrapperOnUpdate(vnode) {
    var el = vnode.dom;

    if (this.model && this.state.scroll.autoScroll) {
      if (this.autoScrollTimeout) clearTimeout(this.autoScrollTimeout);
      this.autoScrollTimeout = setTimeout(this.scrollToBottom.bind(this), 100);
    }

    if (el.scrollTop <= 0) el.scrollTop = 1;
    this.checkUnreaded();
  };

  _proto.wrapperOnScroll = function wrapperOnScroll(e) {
    e.redraw = false;
    var el = e.target;
    this.state.scroll.autoScroll = el.scrollTop + el.offsetHeight >= el.scrollHeight - 10;
    this.state.scroll.oldScroll = el.scrollTop;
    if (el.scrollTop <= 0) el.scrollTop += 1;else if (el.scrollTop + el.offsetHeight >= el.scrollHeight) el.scrollTop -= 1;
    this.checkUnreaded();

    if (this.lastFastScrollStatus != this.isFastScrollAvailable()) {
      this.lastFastScrollStatus = this.isFastScrollAvailable();
      m.redraw();
    }
  };

  _proto.checkUnreaded = function checkUnreaded() {
    var _this2 = this;

    var wrapper = this.getChatWrapper();

    if (wrapper && this.model.unreaded()) {
      var list = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getChatMessages(function (mdl) {
        return mdl.chat() == _this2.model && mdl.created_at() > _this2.model.readed_at() && !mdl.isReaded;
      });

      for (var _iterator = list, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var message = _ref;
        var msg = document.querySelector(".message-wrapper[data-id=\"" + message.id() + "\"");

        if (msg && wrapper.scrollTop + wrapper.offsetHeight >= msg.offsetTop) {
          message.isReaded = true;
          _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiReadChat(this.model, this.model.unreaded() == 1 ? new Date() : message);
          this.model.pushAttributes({
            unreaded: this.model.unreaded() - 1
          });
          m.redraw();
        }
      }
    }
  };

  _proto.wrapperOnMouseWheel = function wrapperOnMouseWheel(e) {
    var _this3 = this;

    e.redraw = false;
    var el = this.element;
    var currentHeight = el.scrollHeight;
    if (this.state.scroll.autoScroll) this.state.scroll.needToScroll = false;
    if (this.state.scroll.needToScroll) this.scrollToBottom();

    if (!this.state.messageEditing && this.state.scroll.oldScroll >= 0) {
      if (el.scrollTop <= 500) {
        var topMessage = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getChatMessages(function (model) {
          return model.chat() == _this3.model;
        })[0];
        if (topMessage && topMessage != this.model.first_message()) _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiFetchChatMessages(this.model, topMessage.created_at().toISOString());
      } else if (el.scrollTop + el.offsetHeight >= currentHeight - 500) {
        var bottomMessage = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getChatMessages(function (model) {
          return model.chat() == _this3.model;
        }).slice(-1)[0];
        if (bottomMessage && bottomMessage != this.model.last_message()) _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiFetchChatMessages(this.model, bottomMessage.created_at().toISOString());
      }
    }
  };

  _proto.scrollToAnchor = function scrollToAnchor(anchor) {
    var _this4 = this;

    var scroll = function scroll() {
      var element;
      if (anchor instanceof _models_Message__WEBPACK_IMPORTED_MODULE_4__["default"]) element = $(".message-wrapper[data-id=\"" + anchor.id() + "\"")[0];else element = anchor;

      var chatWrapper = _this4.getChatWrapper();

      if (chatWrapper && element) $(chatWrapper).stop().animate({
        scrollTop: element.offsetTop - element.offsetHeight
      }, 500);else setTimeout(scroll, 100);
    };

    scroll();
  };

  _proto.scrollToBottom = function scrollToBottom() {
    var chatWrapper = this.getChatWrapper();

    if (chatWrapper) {
      if (chatWrapper.scrollTop + chatWrapper.offsetHeight >= chatWrapper.scrollHeight - 1) return;
      $(chatWrapper).stop().animate({
        scrollTop: chatWrapper.scrollHeight
      }, 500);
      if (!this.state.scroll.autoScroll) this.state.scroll.needToScroll = true;
    }
  };

  _proto.inputClear = function inputClear() {
    input.value = '';
  };

  _proto.inputSyncWithPreview = function inputSyncWithPreview() {
    var input = this.getChatInput();

    if (this.state.input.content) {
      input.value = this.state.input.content;
      this.inputProcess();
    } else input.value = '';
  };

  _proto.inputProcess = function inputProcess(e) {
    var _this5 = this;

    if (e) e.redraw = false;
    var input = this.getChatInput();
    var inputValue = input.value.trim();
    this.state.input.messageLength = inputValue.length;
    this.state.input.content = inputValue;
    /*
    if(!input.baseScrollHeight)
    {
        input.baseScrollHeight = input.scrollHeight;
        input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
    }
      input.rows = 1;
    let rows = Math.ceil((input.scrollHeight - input.baseScrollHeight) / input.lineHeight) + 1;
    this.state.input.rows = rows;
    input.rows = rows;
    */

    if (!input.lineHeight) input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
    input.rows = 1;
    input.rows = input.scrollHeight / input.lineHeight;

    if (this.state.input.messageLength) {
      if (!this.state.input.writingPreview && !this.state.messageEditing) this.inputPreviewStart(inputValue);
    } else {
      if (this.state.input.writingPreview && !inputValue.length) this.inputPreviewEnd();
    }

    if (this.state.messageEditing) this.state.messageEditing.content = inputValue;else if (this.state.input.writingPreview) this.state.input.previewModel.content = inputValue;
    this.timedRedraw(100, function () {
      return _this5.state.scroll.autoScroll && !_this5.state.messageEditing ? _this5.scrollToBottom() : null;
    });
  };

  _proto.inputPressEnter = function inputPressEnter(e) {
    e.redraw = false;

    if (e.keyCode == 13 && !e.shiftKey) {
      this.messageSend(this.getChatInput().value);
      return false;
    }

    return true;
  };

  _proto.inputPressButton = function inputPressButton() {
    this.messageSend(this.getChatInput().value);
  };

  _proto.inputClear = function inputClear() {
    this.state.input.messageLength = 0;
    this.state.input.rows = 1;
    this.state.input.content = '';
    var input = this.getChatInput();
    input.value = '';
    input.rows = 1;
  };

  _proto.inputPreviewStart = function inputPreviewStart(content) {
    if (!this.state.input.writingPreview) {
      this.state.input.writingPreview = true;
      this.state.input.previewModel = app.store.createRecord('chatmessages');
      this.state.input.previewModel.pushData({
        id: 0,
        attributes: {
          message: ' ',
          created_at: 0
        },
        relationships: {
          user: app.session.user,
          chat: this.model
        }
      });

      Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(this.state.input.previewModel, {
        isEditing: true,
        isNeedToFlash: true,
        content: content
      });
    } else this.state.input.previewModel.isNeedToFlash = true;

    m.redraw();
  };

  _proto.inputPreviewEnd = function inputPreviewEnd() {
    this.state.input.writingPreview = false;
    m.redraw();
  };

  _proto.onChatMessageClicked = function onChatMessageClicked(eventName, model) {
    switch (eventName) {
      case 'dropdownEditStart':
        {
          this.messageEdit(model, true);
          break;
        }

      case 'dropdownResend':
        {
          this.messageResend(model);
          break;
        }

      case 'insertMention':
        {
          this.insertMention(model);
          break;
        }
    }
  };

  _proto.messageSend = function messageSend(text) {
    if (text.trim().length > 0 && !this.state.loadingSend) {
      if (this.state.input.writingPreview) {
        this.state.input.writingPreview = false;
        this.messagePost(this.state.input.previewModel);
        _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].insertChatMessage(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(this.state.input.previewModel, {}));
        this.inputClear();
      } else if (this.state.messageEditing) {
        var model = this.state.messageEditing;

        if (model.content.trim() !== model.oldContent.trim()) {
          model.oldContent = model.content;
          _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].editChatMessage(model, true, model.content);
        }

        this.messageEditEnd();
        this.inputClear();
      }
    }
  };

  _proto.messageEdit = function messageEdit(model) {
    var chatInput = this.getChatInput();
    if (this.state.input.writingPreview) this.inputPreviewEnd();
    model.isEditing = true;
    model.oldContent = model.message();
    this.state.messageEditing = model;
    chatInput.value = model.oldContent;
    chatInput.focus();
    this.inputProcess();
    m.redraw();
  };

  _proto.messageEditEnd = function messageEditEnd() {
    var message = this.state.messageEditing;

    if (message) {
      message.isEditing = false;
      message.content = message.oldContent;
      this.inputClear();
      m.redraw();
      this.state.messageEditing = null;
    }
  };

  _proto.messageResend = function messageResend(model) {
    this.messagePost(model);
  };

  _proto.messagePost = function messagePost(model) {
    var self = this;
    self.state.loadingSend = true;
    m.redraw();
    return _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].postChatMessage(model).then(function (r) {
      self.state.loadingSend = false;
      m.redraw();
    }, function (r) {
      self.state.loadingSend = false;
      m.redraw();
    });
  };

  _proto.onChatChanged = function onChatChanged(model) {
    if (this.model) this.messagesDraw();
  };

  _proto.messagesDraw = function messagesDraw() {
    var _this6 = this;

    if (!this.state.messagesFetched) {
      var query;

      if (this.model.unreaded()) {
        var _ref2, _this$model$readed_at;

        query = (_ref2 = (_this$model$readed_at = this.model.readed_at()) == null ? void 0 : _this$model$readed_at.toISOString()) != null ? _ref2 : new Date(0).toISOString();
        this.state.scroll.autoScroll = false;
      }

      this.state.scroll.loading.all = true;
      _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].apiFetchChatMessages(this.model, query).then(function () {
        _this6.state.scroll.loading.all = false;

        if (_this6.model.unreaded()) {
          var anchor = _states_ChatState__WEBPACK_IMPORTED_MODULE_5__["default"].getChatMessages(function (mdl) {
            return mdl.chat() == _this6.model && mdl.created_at() > _this6.model.readed_at();
          })[0];

          _this6.scrollToAnchor(anchor);
        }

        m.redraw();
      });
      this.state.messagesFetched = true;
      m.redraw();
    }

    this.inputSyncWithPreview();
    this.getChatWrapper().scrollTop = this.state.scroll.oldScroll;
  };

  _proto.timedRedraw = function timedRedraw(timeout, callback) {
    var _this7 = this;

    if (!this.redrawTimeout) {
      this.redrawTimeout = setTimeout(function () {
        m.redraw();
        if (callback) callback();
        _this7.redrawTimeout = null;
      }, timeout);
    }
  };

  _proto.insertMention = function insertMention(model) {
    var user = model.user();
    if (!app.session.user) return;
    var input = this.getChatInput();
    input.value += " @" + user.username() + " ";
    input.focus();
    this.inputProcess();
  };

  return ChatViewport;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/ChatWelcome.js":
/*!*********************************************!*\
  !*** ./src/forum/components/ChatWelcome.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChatWelcome; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../states/ChatState */ "./src/forum/states/ChatState.js");




var ChatWelcome =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChatWelcome, _Component);

  function ChatWelcome() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChatWelcome.prototype;

  _proto.view = function view(vnode) {
    return m("div", null, m("div", {
      className: "wrapper",
      style: {
        height: _states_ChatState__WEBPACK_IMPORTED_MODULE_2__["default"].getFrameState('transform').y + 40 + 'px'
      }
    }, _states_ChatState__WEBPACK_IMPORTED_MODULE_2__["default"].getChats().length ? m("div", {
      className: "welcome"
    }, m("h1", null, app.translator.trans('pushedx-chat.forum.chat.welcome.header')), m("span", null, app.translator.trans('pushedx-chat.forum.chat.welcome'))) : null));
  };

  return ChatWelcome;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/UsersSearchResults.js":
/*!****************************************************!*\
  !*** ./src/forum/components/UsersSearchResults.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersSearchResults; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/helpers/avatar */ "flarum/helpers/avatar");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/highlight */ "flarum/helpers/highlight");
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);






var UsersSearchResults =
/*#__PURE__*/
function () {
  function UsersSearchResults(props) {
    this.results = {};
    this.searching = false;
    if (!props.state.usersSelected) props.state.usersSelected = [];
    this.usersSelected = props.state.usersSelected;
  }

  var _proto = UsersSearchResults.prototype;

  _proto.search = function search(query) {
    var _this = this;

    this.searching = true;
    return app.store.find('users', {
      filter: {
        q: query
      },
      page: {
        limit: 5
      }
    }).then(function (results) {
      _this.results[query] = results;
      _this.searching = false;
      m.redraw();
    });
  };

  _proto.isUserSelected = function isUserSelected(user) {
    return this.usersSelected.some(function (u) {
      return user.id() == u.id();
    });
  };

  _proto.userClick = function userClick(user) {
    if (!this.isUserSelected(user)) this.usersSelected.push(user);else this.usersSelected.splice(this.usersSelected.indexOf(user), 1);
  };

  _proto.view = function view(query) {
    var _this2 = this;

    query = query.toLowerCase();
    var localUserId;
    if (app.session.user) localUserId = app.session.user.id();
    var usersList = (this.results[query] || []).concat(app.store.all('users').filter(function (user) {
      return [user.username(), user.displayName()].some(function (value) {
        return value.toLowerCase().substr(0, query.length) === query;
      });
    })).filter(function (user) {
      return user.id() != localUserId;
    });
    var resultsFind = usersList.filter(function (e, i, arr) {
      return arr.lastIndexOf(e) === i;
    }).sort(function (a, b) {
      return a.displayName().localeCompare(b.displayName());
    });
    var resultsSelected = Object.values(this.usersSelected).slice(-5);

    if (!resultsFind.length) {
      if (!this.searching) return m("li", {
        className: "SearchFailed"
      }, app.translator.trans('pushedx-chat.forum.chat.list.add_modal.search.failed'));else flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        size: 'tiny',
        className: 'Button Button--icon Button--link'
      });
    }

    return [m("li", {
      className: "Dropdown-header"
    }, app.translator.trans('core.forum.search.users_heading')), resultsFind.map(function (user) {
      var name = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2___default()(user);
      var id = user.id();
      var children = [flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default()(name.text, query)];
      return m("li", {
        className: "UserSearchResult UserSearchResult",
        "data-index": 'users' + id,
        onclick: _this2.userClick.bind(_this2, user)
      }, m("span", {
        "class": _this2.usersSelected[id] ? 'selected' : null
      }, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1___default()(user), Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, name, {
        text: undefined,
        children: children
      })));
    }), resultsSelected.length ? m("li", {
      className: "Dropdown-header"
    }, app.translator.trans('pushedx-chat.forum.chat.list.add_modal.search.invited')) : null, resultsSelected.map(function (user) {
      var name = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2___default()(user);
      var children = [flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default()(name.text, query)];
      return m("li", {
        className: "UserSearchResult UserSearchResult",
        "data-index": 'users' + user.id(),
        onclick: _this2.userClick.bind(_this2, user)
      }, m("span", {
        "class": "selected"
      }, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1___default()(user), Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, name, {
        text: undefined,
        children: children
      })));
    })];
  };

  return UsersSearchResults;
}();



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/HeaderPrimary */ "flarum/components/HeaderPrimary");
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ChatFrame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ChatFrame */ "./src/forum/components/ChatFrame.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/forum/store.js");
/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/Chat */ "./src/forum/models/Chat.js");
/* harmony import */ var _models_Message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/Message */ "./src/forum/models/Message.js");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _states_ChatState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./states/ChatState */ "./src/forum/states/ChatState.js");










var moduleInited = false;
app.initializers.add('pushedx-chat', function (app) {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    if (!app.forum.attribute('pushedx-chat.permissions.enabled')) return;

    if (!moduleInited) {
      var pivot = function pivot(name, id, attr, transform) {
        pivot.hasOne = function (name, id, attr) {
          return function () {
            var relationship = this.data.attributes[name] && this.data.attributes[name][id][attr];
            if (relationship) return app.store.getById(relationship.data.type, relationship.data.id);
          };
        };

        return function () {
          var value = this.data.attributes[name] && this.data.attributes[name][id][attr];
          return transform ? transform(value) : value;
        };
      };

      moduleInited = true;
      _states_ChatState__WEBPACK_IMPORTED_MODULE_9__["default"].init();
      Object(_store__WEBPACK_IMPORTED_MODULE_4__["default"])({
        chats: _models_Chat__WEBPACK_IMPORTED_MODULE_5__["default"],
        chatmessages: _models_Message__WEBPACK_IMPORTED_MODULE_6__["default"]
      });

      Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(flarum_models_User__WEBPACK_IMPORTED_MODULE_7___default.a.prototype, {
        chat_pivot: function chat_pivot(chat_id) {
          return {
            role: pivot('chat_pivot', chat_id, 'role').bind(this),
            removed_by: pivot('chat_pivot', chat_id, 'removed_by').bind(this),
            readed_at: pivot('chat_pivot', chat_id, 'readed_at', flarum_Model__WEBPACK_IMPORTED_MODULE_8___default.a.transformDate).bind(this),
            removed_at: pivot('chat_pivot', chat_id, 'removed_at', flarum_Model__WEBPACK_IMPORTED_MODULE_8___default.a.transformDate).bind(this),
            joined_at: pivot('chat_pivot', chat_id, 'joined_at', flarum_Model__WEBPACK_IMPORTED_MODULE_8___default.a.transformDate).bind(this)
          };
        }
      });
    }

    items.add('pushedx-chat-frame', m(_components_ChatFrame__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  });
});

/***/ }),

/***/ "./src/forum/models/Chat.js":
/*!**********************************!*\
  !*** ./src/forum/models/Chat.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chat; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/computed */ "flarum/utils/computed");
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__);





var Chat =
/*#__PURE__*/
function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Chat, _Model);

  function Chat() {
    return _Model.apply(this, arguments) || this;
  }

  return Chat;
}(flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a);



Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Chat.prototype, {
  _title: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('title'),
  _color: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('color'),
  type: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('type'),
  created_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('created_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  creator: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('creator'),
  users: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasMany('users'),
  first_message: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('first_message'),
  last_message: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('last_message'),
  icon: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('icon'),
  unreaded: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('unreaded'),
  readed_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('readed_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  removed_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('removed_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  joined_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('joined_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  removed_by: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('removed_by'),
  pm_user: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('freshness', function (updated) {
    return this.getPMUser();
  }),
  title: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('pm_user', '_title', function (pm_user, _title) {
    return pm_user ? pm_user.displayName() : _title;
  }),
  color: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('pm_user', '_color', function (pm_user, _color) {
    return pm_user ? pm_user.color() : _color;
  }),
  avatarUrl: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('pm_user', function (pm_user) {
    return pm_user ? pm_user.avatarUrl() : null;
  }),
  textColor: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('color', function (color) {
    return this.pickTextColorBasedOnBgColorSimple(color, '#FFF', '#000');
  }),
  getPMUser: function getPMUser() {
    var users = this.users();

    if (app.session.user && this.type() == 0 && users.length && users.length < 3) {
      for (var _iterator = users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;
        if (user && user.id() != app.session.user.id()) return user;
      }
    }

    return null;
  },
  pickTextColorBasedOnBgColorSimple: function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
  }
});

/***/ }),

/***/ "./src/forum/models/Message.js":
/*!*************************************!*\
  !*** ./src/forum/models/Message.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);




var Message =
/*#__PURE__*/
function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Message, _Model);

  function Message() {
    return _Model.apply(this, arguments) || this;
  }

  return Message;
}(flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a);



Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Message.prototype, {
  message: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('message'),
  user: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('user'),
  deleted_by: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('deleted_by'),
  chat: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('chat'),
  created_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('created_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  edited_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('edited_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  type: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('type'),
  is_readed: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('is_readed'),
  ip_address: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('ip_address'),
  is_censored: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('is_censored')
});

/***/ }),

/***/ "./src/forum/resources.js":
/*!********************************!*\
  !*** ./src/forum/resources.js ***!
  \********************************/
/*! exports provided: base64AudioNotificationRef, base64AudioNotification, base64PlaceholderAvatarImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64AudioNotificationRef", function() { return base64AudioNotificationRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64AudioNotification", function() { return base64AudioNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64PlaceholderAvatarImage", function() { return base64PlaceholderAvatarImage; });
var base64AudioNotificationRef = "data:audio/ogg;base64,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";
var base64AudioNotification = "data:audio/ogg;base64,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";
var base64PlaceholderAvatarImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPZSURBVHhe7Zs9aNVQGIZvioODQwdHCxUqdHBQtNihg4NLQdCigg6CoKKiNS4dnKRDcXBpEaHSggWFLg4WBBcHBwdLCzo4FBQs2NHBoYODcH2fnOQ2iUnvT27uvcnpA29Ozh3afG++85OTE6darVZyxXEP6XhSOiUNS4NSv1+G2ZR+++WGtCqtV6pzWypzIx8DHHdUx3PSRWmInzLwXXotrciMT94vbaR9Bjgud/WadEviTucBmfFcWpIZZEtmshtgAn8guRLnnYDg56TZrEZkM8Bxb+j4WDro1TvPL+mhTFg01eZpzQDHpV0vSKe9evf5IN2UEfQXTdHnl43juJd1XJN6JXjgWtb8a2uKxjPAcffp+ESivfcys9KUsuGvqe5OYwaY4JclhrUiwLB5pRET6htQvOAD3kiX6pmwex9Q3ODhvLTsx5BKvU6QNl/E4AO4dmJIJb0JmB6Vu18GrqopvPLPIyQbYMZ5hrpOzezyZls6njRPSGsCTHLKEjwckF6Y0yj/G2Cmt700yWkXY4rtnn9eI9oEzIPNN6lbc/u84dnhiJpC7QEqngHM8soaPBBbZCa7kwHm7v+QytT2k+DuHw6yIJwBLGaUPXggxtvmNGoAKzm2cN0vfQPMGl5ey1i9yJBiHuMkyAAWMG3jAofAgCLP91uFhyWNApX7rNv/pGIhA2QALy1sZRQDeGNjKycwwKbeP84wBsTf0dnEIAbYMPtLo38vA/wTa9kzwC+tBQPYkWErmxiQ6f16wdneywAdmn6nXiI2MIDdWLayigHr5txK1vsq1Tn6ABv7gU1iJwPgrV/ahBdzYMCKX9qEF3P4xQjLYiyP2cCW0n+AkyAD4Jlf2kAt1rAB85INs8I/ErF67Bhg3pUtmUqpmQ/eC0I4A2BaKnMWEBsx1ogaYJyZMZVSMhO++xDPAGCnZRlnh18kYouQtkmKpfLP0n6vXnzo+EZ097+a6g5JGUBT4MOESVMpBZNJwUOyAWD24Le8D7+HWPRjSSTdAMMdiY3HRYX5PjGkktwHhHFc9ti9k7wNBQXiozSuu88myVTqZQBNgT8wLhXpiZFrrRs81DcAzB+akIrQJ3CNE40ED/WbQByzk/Sp1GtDJEMdvX1TN6l5A8Bxj+r4Ujrm1bsPkxx2hCcOdbvRWBOIY/7RiDQldfPZgf/NNSROchqhtQwIY3aYPpLYfNipZhE80k4r8Ew3ILsBAcYITLgr5bWyxIfULGZEHmmz0D4DwjjuGR3Ze3hWyrr/gBVrhjU+nn7v/dJG8jEgjONiQPzzeSZXcWMIlKGLMvz5fI5L9pXKP+lVHvxHrr8zAAAAAElFTkSuQmCC";

/***/ }),

/***/ "./src/forum/states/ChatState.js":
/*!***************************************!*\
  !*** ./src/forum/states/ChatState.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ChatPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ChatPreview */ "./src/forum/components/ChatPreview.js");
/* harmony import */ var _components_ChatViewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ChatViewport */ "./src/forum/components/ChatViewport.js");
/* harmony import */ var _components_ChatMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ChatMessage */ "./src/forum/components/ChatMessage.js");
/* harmony import */ var _components_ChatEventMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ChatEventMessage */ "./src/forum/components/ChatEventMessage.js");
/* harmony import */ var _models_Message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/Message */ "./src/forum/models/Message.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_evented__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/evented */ "flarum/utils/evented");
/* harmony import */ var flarum_utils_evented__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_evented__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../resources */ "./src/forum/resources.js");








var refAudio = new Audio();
refAudio.src = _resources__WEBPACK_IMPORTED_MODULE_7__["base64AudioNotificationRef"];
refAudio.volume = 0.5;
var audio = new Audio();
audio.src = _resources__WEBPACK_IMPORTED_MODULE_7__["base64AudioNotification"];
audio.volume = 0.5;

var ChatState =
/*#__PURE__*/
function () {
  function ChatState() {}

  var _proto = ChatState.prototype;

  _proto.init = function init() {
    var _JSON$parse, _neonchatState$beingS, _neonchatState$beingS2, _neonchatState$isMute, _neonchatState$notify, _neonchatState$transf, _neonchatState$select;

    this.chats = [];
    this.chatmessages = [];
    this.curChat = null;
    this.evented = flarum_utils_evented__WEBPACK_IMPORTED_MODULE_6___default.a;
    this.totalHiddenCount = 0;
    var neonchatState = (_JSON$parse = JSON.parse(localStorage.getItem('neonchat'))) != null ? _JSON$parse : {};
    this.frameState = {
      beingShown: (_neonchatState$beingS = neonchatState.beingShown) != null ? _neonchatState$beingS : app.forum.attribute('pushedx-chat.settings.display.minimize'),
      beingShownChatsList: (_neonchatState$beingS2 = neonchatState.beingShownChatsList) != null ? _neonchatState$beingS2 : 0,
      isMuted: (_neonchatState$isMute = neonchatState.isMuted) != null ? _neonchatState$isMute : false,
      notify: (_neonchatState$notify = neonchatState.notify) != null ? _neonchatState$notify : false,
      transform: (_neonchatState$transf = neonchatState.transform) != null ? _neonchatState$transf : {
        x: 0,
        y: 400
      },
      isActive: true,
      selectedChat: (_neonchatState$select = neonchatState.selectedChat) != null ? _neonchatState$select : 0
    };
    this.permissions = {
      post: app.forum.attribute('pushedx-chat.permissions.chat'),
      edit: app.forum.attribute('pushedx-chat.permissions.edit'),
      "delete": app.forum.attribute('pushedx-chat.permissions.delete'),
      moderate: {
        "delete": app.forum.attribute('pushedx-chat.permissions.moderate.delete'),
        vision: app.forum.attribute('pushedx-chat.permissions.moderate.vision')
      }
    };
    this.viewportState = {};
    if (app.session.user) app.pusher.then(this.listenSocketChannels.bind(this));
    this.evented.on('onClickMessage', this.onChatMessageClicked.bind(this));
  };

  _proto.initViewportState = function initViewportState() {
    return {
      loadingSend: false,
      scroll: {
        autoScroll: true,
        oldScroll: 0,
        loading: {
          all: false,
          queries: {}
        },
        needToScroll: false
      },
      input: {
        messageLength: 0,
        rows: 1,
        content: ''
      },
      messagesFetched: false
    };
  };

  _proto.getViewportState = function getViewportState(model) {
    return this.viewportState[model.id()];
  };

  _proto.listenSocketChannels = function listenSocketChannels(socket) {
    socket.main.bind('neonchat.events', this.handleSocketEvent.bind(this));
    if (socket.user) socket.user.bind('neonchat.events', this.handleSocketEvent.bind(this));
  };

  _proto.handleSocketEvent = function handleSocketEvent(r) {
    console.log(r);
    var message = r.response.message;
    if (message) message = app.store.pushPayload(message);
    var chat = r.response.chat;
    if (chat) chat = app.store.pushPayload(chat);

    switch (r.event.id) {
      case 'message.post':
        {
          if (!app.session.user || message.user().id() != app.session.user.id()) {
            this.insertChatMessage(message, true);
            m.redraw();
          }

          break;
        }

      case 'message.edit':
        {
          var actions = message.data.attributes.actions;

          if (actions.msg !== undefined) {
            if (!app.session.user || message.user().id() != app.session.user.id()) this.editChatMessage(message, false, actions.msg);
          } else if (actions.hide !== undefined) {
            if (!app.session.user || actions.invoker != app.session.user.id()) actions.hide ? this.hideChatMessage(message, false, message.deleted_by()) : this.restoreChatMessage(message, false);
          }

          break;
        }

      case 'message.delete':
        {
          if (!app.session.user || message.deleted_by().id() != app.session.user.id()) this.deleteChatMessage(message, false, message.deleted_by());
          break;
        }

      case 'chat.create':
        {
          if (!app.session.user || chat.creator() != app.session.user) {
            this.addChat(chat, true);
            m.redraw();
          }

          break;
        }

      case 'chat.edit':
        {
          this.editChat(chat, true);
          var range = r.response.eventmsg_range;
          if (range) this.apiFetchChatMessages(chat, range, {
            notify: true,
            withFlash: true,
            disableLoader: true
          });
          m.redraw();
          break;
        }

      case 'chat.delete':
        {
          if (!app.session.user || chat.creator() != app.session.user) {
            this.deleteChat(chat);
            m.redraw();
          }

          break;
        }
    }
  };

  _proto.getFrameState = function getFrameState(key) {
    return this.frameState[key];
  };

  _proto.saveFrameState = function saveFrameState(key, value) {
    var _JSON$parse2;

    var neonchatState = (_JSON$parse2 = JSON.parse(localStorage.getItem('neonchat'))) != null ? _JSON$parse2 : {};
    neonchatState[key] = value;
    localStorage.setItem('neonchat', JSON.stringify(neonchatState));
    this.frameState[key] = value;
  };

  _proto.getPermissions = function getPermissions() {
    return this.permissions;
  };

  _proto.getChats = function getChats() {
    return this.chats;
  };

  _proto.componentsChats = function componentsChats() {
    var _this = this;

    return this.getChats().map(function (model) {
      return m("div", {
        onclick: _this.onChatChanged.bind(_this, model)
      }, m(_components_ChatPreview__WEBPACK_IMPORTED_MODULE_0__["default"], {
        key: model.id(),
        model: model
      }));
    });
  };

  _proto.addChat = function addChat(model, outside) {
    if (outside === void 0) {
      outside = false;
    }

    this.chats.push(model);
    this.viewportState[model.id()] = this.initViewportState();
    if (model.id() == this.getFrameState('selectedChat')) this.onChatChanged(model);
    if (outside) model.isNeedToFlash = true;

    app.test = function () {
      return model["delete"]();
    };
  };

  _proto.editChat = function editChat(model, outside) {
    if (outside === void 0) {
      outside = false;
    }

    if (outside) model.isNeedToFlash = true;
  };

  _proto.apiReadChat = function apiReadChat(chat, message) {
    if (this.readingTimeout) clearTimeout(this.readingTimeout);
    var timestamp;
    if (message instanceof Date) timestamp = message.toISOString();else if (message instanceof _models_Message__WEBPACK_IMPORTED_MODULE_4__["default"]) timestamp = message.created_at().toISOString();
    this.readingTimeout = setTimeout(function () {
      return chat.save({
        actions: {
          reading: timestamp
        }
      });
    }, 1000);
  };

  _proto.deleteChat = function deleteChat(model) {
    this.chats = this.chats.map(function (mdl) {
      return mdl != model;
    });
    if (this.getCurrentChat() == model) this.setCurrentChat(null);
  };

  _proto.isExistsPMChat = function isExistsPMChat(user1, user2) {
    return this.getChats().some(function (model) {
      var users = model.users();
      return users.length == 2 && users.some(function (model) {
        return model == user1;
      }) && users.some(function (model) {
        return model == user2;
      });
    });
  };

  _proto.colorizeOddChatMessages = function colorizeOddChatMessages() {
    var odd = false;
    $($('.message-wrapper').get().reverse()).each(function () {
      var e = $(this);

      if (!e.hasClass('deleted')) {
        odd = !odd;
        odd ? e.removeClass('odd') : e.addClass('odd');
      }
    });
  };

  _proto.onChatChanged = function onChatChanged(model, e) {
    if (e === void 0) {
      e = {};
    }

    e.redraw = false;
    if (model == this.getCurrentChat()) return;
    this.setCurrentChat(model);
    m.redraw.sync();
    this.evented.trigger('onChatChanged', model);
  };

  _proto.comporatorAscButZerosDesc = function comporatorAscButZerosDesc(a, b) {
    return a == 0 ? 1 : b == 0 ? -1 : a - b;
  };

  _proto.getChatMessages = function getChatMessages(filter) {
    var _this2 = this;

    var list = this.chatmessages.sort(function (a, b) {
      return _this2.comporatorAscButZerosDesc(a.id(), b.id());
    });
    return filter ? list.filter(filter) : list;
  };

  _proto.apiFetchChatMessages = function apiFetchChatMessages(model, query, options) {
    var _this3 = this;

    if (options === void 0) {
      options = {};
    }

    var viewport = this.getViewportState(model);
    var self = this;
    if (viewport.scroll.loading.queries[query]) return;
    viewport.scroll.loading.queries[query] = true;
    return app.store.find('chatmessages', {
      chat_id: model.id(),
      query: query
    }).then(function (r) {
      if (r.length) {
        r.map(function (model) {
          if (options.withFlash) model.isNeedToFlash = true;
          self.insertChatMessage(model);
        });
        if (options.notify) _this3.messageNotify(r[0]);
        viewport.scroll.loading.queries[query] = false;
        m.redraw();
      }
    });
  };

  _proto.componentChatMessage = function componentChatMessage(model) {
    return model.type() ? m(_components_ChatEventMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: model.id(),
      model: model
    }) : m(_components_ChatMessage__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: model.id(),
      model: model
    });
  };

  _proto.componentsChatMessages = function componentsChatMessages() {
    var _this4 = this;

    return this.getChatMessages().map(function (model) {
      return _this4.componentChatMessage(model);
    });
  };

  _proto.isChatMessageExists = function isChatMessageExists(model) {
    return this.chatmessages.find(function (e) {
      return e.id() == model.id();
    });
  };

  _proto.insertEventChatMessage = function insertEventChatMessage(model, data, notify) {
    if (notify === void 0) {
      notify = false;
    }

    model.pushAttributes({
      message: JSON.stringify(data)
    });
    insertChatMessage(model, notify);
  };

  _proto.insertChatMessage = function insertChatMessage(model, notify) {
    if (notify === void 0) {
      notify = false;
    }

    if (this.isChatMessageExists(model)) return null;
    this.chatmessages.push(model);

    if (notify) {
      this.messageNotify(model);
      model.isNeedToFlash = true;
      model.pushAttributes({
        unreaded: model.unreaded() + 1
      });
    }

    var list = this.getChatMessages(function (mdl) {
      return mdl.chat() == model.chat();
    });
    if (notify && model.id() && list[list.length - 1] == model) model.chat().pushData({
      relationships: {
        last_message: model
      }
    });
  };

  _proto.renderChatMessage = function renderChatMessage(model, content) {
    var element = model instanceof flarum_Model__WEBPACK_IMPORTED_MODULE_5___default.a ? document.querySelector(".neonchat .message-wrapper[data-id=\"" + model.id() + "\"] .message") : model;

    if (element) {
      element.innerText = content;
      s9e.TextFormatter.preview(content, element);
      if (this.executeScriptsTimeout) clearTimeout(this.executeScriptsTimeout);
      this.executeScriptsTimeout = setTimeout(function () {
        $('.neonchat script').each(function () {
          if (!self.executedScripts) self.executedScripts = {};
          var scriptURL = $(this).attr('src');

          if (!self.executedScripts[scriptURL]) {
            var scriptTag = document.createElement("script");
            scriptTag.src = scriptURL;
            document.head.appendChild(scriptTag);
            self.executedScripts[scriptURL] = true;
          }
        });
      }, 100);
    }
  };

  _proto.onChatMessageClicked = function onChatMessageClicked(eventName, model) {
    switch (eventName) {
      case 'dropdownHide':
        {
          this.hideChatMessage(model, true);
          break;
        }

      case 'dropdownRestore':
        {
          this.restoreChatMessage(model, true);
          break;
        }

      case 'dropdownDelete':
        {
          this.deleteChatMessage(model, true);
          break;
        }
    }
  };

  _proto.postChatMessage = function postChatMessage(model) {
    return model.save({
      message: model.content,
      created_at: new Date(),
      chat_id: model.chat().id()
    }).then(function (r) {
      model.isTimedOut = false;
      model.isNeedToFlash = true;
      model.isEditing = false;
      model.chat().pushData({
        relationships: {
          last_message: model
        }
      });
    }, function (r) {
      model.isTimedOut = true;
    });
  };

  _proto.editChatMessage = function editChatMessage(model, sync, content) {
    if (sync === void 0) {
      sync = false;
    }

    model.content = content;
    model.isNeedToFlash = true;
    model.pushAttributes({
      message: content,
      edited_at: new Date()
    });
    if (sync) model.save({
      actions: {
        msg: content
      },
      edited_at: new Date(),
      message: content
    });
    m.redraw();
  };

  _proto.deleteChatMessage = function deleteChatMessage(model, sync, user) {
    if (sync === void 0) {
      sync = false;
    }

    if (user === void 0) {
      user = app.session.user;
    }

    model.isDeletedForever = true;
    if (!model.deleted_by()) model.pushData({
      relationships: {
        deleted_by: user
      }
    });
    var list = this.getChatMessages(function (mdl) {
      return mdl.chat() == model.chat() && !mdl.isDeletedForever;
    });
    if (list.length) model.chat().pushData({
      relationships: {
        last_message: list[list.length - 1]
      }
    });
    this.chatmessages = this.chatmessages.filter(function (mdl) {
      return mdl != model;
    });
    if (sync) model["delete"]();
    m.redraw();
  };

  _proto.totalHidden = function totalHidden() {
    return this.totalHiddenCount;
  };

  _proto.hideChatMessage = function hideChatMessage(model, sync, user) {
    if (sync === void 0) {
      sync = false;
    }

    if (user === void 0) {
      user = app.session.user;
    }

    model.pushData({
      relationships: {
        deleted_by: user
      }
    });
    if (sync) model.save({
      actions: {
        hide: true
      },
      relationships: {
        deleted_by: app.session.user
      }
    });
    this.totalHiddenCount++;
    m.redraw();
  };

  _proto.restoreChatMessage = function restoreChatMessage(model, sync) {
    if (sync === void 0) {
      sync = false;
    }

    if (!this.isChatMessageExists(model)) {
      this.insertChatMessage(model);
      model.isNeedToFlash = true;
    } else {
      model.pushAttributes({
        deleted_by: 0
      });
      model.isNeedToFlash = true;
      delete model.data.relationships.deleted_by;
    }

    if (sync) model.save({
      actions: {
        hide: false
      },
      deleted_by: 0
    });
    m.redraw();
  };

  _proto.setCurrentChat = function setCurrentChat(model) {
    this.curChat = model;
    this.saveFrameState('selectedChat', model.id());
  };

  _proto.getCurrentChat = function getCurrentChat() {
    return this.curChat;
  };

  _proto.apiFetchChats = function apiFetchChats() {
    var self = this;
    return app.store.find('chats').then(function (chats) {
      chats.map(function (model) {
        return self.addChat(model);
      });
      m.redraw();
    });
  };

  _proto.componentCurViewport = function componentCurViewport() {
    var model = this.getCurrentChat();
    return model ? m(_components_ChatViewport__WEBPACK_IMPORTED_MODULE_1__["default"], {
      model: model
    }) : null;
  };

  _proto.messageNotify = function messageNotify(model) {
    if (!app.session.user || model.user().id() != app.session.user.id()) this.notifyTry(model);
  };

  _proto.notifyTry = function notifyTry(model) {
    if (!("Notification" in window)) return;
    if (this.messageIsMention(model)) this.notifySend(model);
    this.notifySound(model);
  };

  _proto.messageIsMention = function messageIsMention(model) {
    return app.session.user && model.message().indexOf('@' + app.session.user.username()) >= 0;
  };

  _proto.notifySend = function notifySend(model) {
    var avatar = model.user().avatarUrl();
    if (!avatar) avatar = _resources__WEBPACK_IMPORTED_MODULE_7__["base64PlaceholderAvatarImage"];
    if (this.getFrameState('notify') && document.hidden) new Notification(model.chat().title(), {
      body: model.user().username() + ": " + model.message(),
      icon: avatar,
      silent: true,
      timestamp: new Date()
    });
  };

  _proto.notifySound = function notifySound(model) {
    if (!this.getFrameState('isMuted')) {
      var sound = this.messageIsMention(model) ? refAudio : audio;
      sound.currentTime = 0;
      sound.play();
    }
  }
  /**
   * https://github.com/flarum/core/blob/7e74f5a03c7f206014f3f091968625fc0bf29094/js/src/forum/components/PostStream.js#L579
   * 
   * 'Flash' the given post, drawing the user's attention to it.
   *
   * @param {jQuery} $item
   */
  ;

  _proto.flashItem = function flashItem($item) {
    $item.addClass('flash').one('animationend webkitAnimationEnd', function () {
      return $item.removeClass('flash');
    });
  };

  return ChatState;
}();

/* harmony default export */ __webpack_exports__["default"] = (new ChatState());

/***/ }),

/***/ "./src/forum/store.js":
/*!****************************!*\
  !*** ./src/forum/store.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extendGlobalStore; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");

function extendGlobalStore(models) {
  app.store.models = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(app.store.models, models);
}

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/Dropdown":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/Dropdown']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Dropdown'];

/***/ }),

/***/ "flarum/components/HeaderPrimary":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderPrimary']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/HeaderPrimary'];

/***/ }),

/***/ "flarum/components/Link":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Link']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Link'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Search":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Search']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Search'];

/***/ }),

/***/ "flarum/components/Separator":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/Separator']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Separator'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/avatar":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['helpers/avatar']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/avatar'];

/***/ }),

/***/ "flarum/helpers/fullTime":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['helpers/fullTime']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/fullTime'];

/***/ }),

/***/ "flarum/helpers/highlight":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/highlight']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/highlight'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/helpers/username":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['helpers/username']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/username'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "flarum/utils/SubtreeRetainer":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['utils/SubtreeRetainer']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/SubtreeRetainer'];

/***/ }),

/***/ "flarum/utils/classList":
/*!********************************************************!*\
  !*** external "flarum.core.compat['utils/classList']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/classList'];

/***/ }),

/***/ "flarum/utils/computed":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/computed']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/computed'];

/***/ }),

/***/ "flarum/utils/evented":
/*!******************************************************!*\
  !*** external "flarum.core.compat['utils/evented']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/evented'];

/***/ }),

/***/ "flarum/utils/extractText":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['utils/extractText']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extractText'];

/***/ }),

/***/ "flarum/utils/humanTime":
/*!********************************************************!*\
  !*** external "flarum.core.compat['utils/humanTime']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/humanTime'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map