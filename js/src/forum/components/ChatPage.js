import Page from 'flarum/common/components/Page';

export default class ChatPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.bodyClass = 'App--chat';
    }

    view() {
        return <div className="ChatPage"></div>;
    }
}
