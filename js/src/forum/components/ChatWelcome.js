import Component from 'flarum/Component';
import ChatState from '../states/ChatState';

export default class ChatWelcome extends Component {
    view(vnode) {
        return (
            <div>
                <div className="wrapper" style={{ height: ChatState.getFrameState('transform').y + 40 + 'px' }}>
                    {ChatState.getChats().length ? (
                        <div className="welcome">
                            <h1>{app.translator.trans('xelson-chat.forum.chat.welcome.header')}</h1>
                            <span>{app.translator.trans('xelson-chat.forum.chat.welcome')}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
