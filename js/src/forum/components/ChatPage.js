import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
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
                <ChatViewport></ChatViewport>
            </div>
        );
    }
}
