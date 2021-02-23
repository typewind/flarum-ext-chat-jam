import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import listItems from 'flarum/helpers/listItems';
import ChatHeader from './ChatHeader';
import ChatViewport from './ChatViewport';

export default class ChatPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.bodyClass = 'App--chat';
    }

    view() {
        return (
            <div className="ChatPage">
                <nav className="IndexPage-nav sideNav">
                    <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                </nav>
                <ChatHeader></ChatHeader>
                {app.chat.chatsLoading ? <LoadingIndicator></LoadingIndicator> : <ChatViewport chatModel={app.chat.getCurrentChat()}></ChatViewport>}
            </div>
        );
    }
}
