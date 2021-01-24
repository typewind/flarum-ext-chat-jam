import Component from 'flarum/Component';
import ChatCreateModal from './ChatCreateModal';

export default class ChatFrame extends Component {
    view(vnode) {
        return (
            <div id="chats-list" className={app.chat.getFrameState('beingShownChatsList') ? 'toggled' : ''}>
                <div className="header">
                    <div className="input-wrapper input--down" style="opacity:0">
                        <textarea id="chat-find" placeholder={app.translator.trans('xelson-chat.forum.chat.list.placeholder')} />
                    </div>
                    <div
                        className="icon icon-toggle"
                        onclick={this.toggleChatsList.bind(this)}
                        data-title={app.translator.trans(
                            'xelson-chat.forum.chat.list.' + (app.chat.getFrameState('beingShownChatsList') ? 'unpin' : 'pin')
                        )}
                    >
                        <i className="fas fa-paperclip"></i>
                    </div>
                </div>
                <div className="list" style={{ 'max-height': app.chat.getFrameState('transform').y + 'px' }}>
                    {app.chat.componentsChats()}
                    {app.session.user && app.chat.getPermissions().create.chat ? (
                        <div class="panel-add" onclick={() => app.modal.show(ChatCreateModal)}></div>
                    ) : null}
                </div>
            </div>
        );
    }

    getChatsListPanel() {
        return document.querySelector('.NeonChatFrame #chats-list');
    }

    getChatsList() {
        return document.querySelector('.NeonChatFrame #chats-list .list');
    }

    toggleChatsList(e) {
        var chatLists = this.getChatsListPanel();
        var showing = true;

        if (chatLists.classList.contains('toggled')) {
            chatLists.classList.remove('toggled');
            showing = false;
        } else chatLists.classList.add('toggled');

        app.chat.saveFrameState('beingShownChatsList', showing);
    }
}
