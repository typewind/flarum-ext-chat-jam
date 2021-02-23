import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import listItems from 'flarum/helpers/listItems';
import Stream from 'flarum/utils/Stream';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatViewport from './ChatViewport';

export default class ChatPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.bodyClass = 'App--chat';
        this.listOpen = Stream(false);
    }

    view() {
        return (
            <div className="ChatPage">
                <nav className="IndexPage-nav sideNav">
                    <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                </nav>
                <ChatHeader showChatListStream={this.listOpen}></ChatHeader>
                {app.chat.chatsLoading ? <LoadingIndicator></LoadingIndicator> : <ChatViewport chatModel={app.chat.getCurrentChat()}></ChatViewport>}
                {this.listOpen() ? 
                    <div class="ChatPage--list">
                        <ChatList inPage={true}></ChatList>
                    </div> : ''
                }
            </div>
        );
    }
}
