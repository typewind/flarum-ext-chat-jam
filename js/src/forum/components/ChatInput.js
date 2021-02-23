import Component from 'flarum/Component';

export default class ChatInput extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.model = this.attrs.model;
        this.state = this.attrs.state;

        this.messageCharLimit = app.forum.attribute('xelson-chat.settings.charlimit') ?? 512;
    }

    onupdate(vnode) {
        this.model = this.attrs.model;
        this.state = this.attrs.state;
    }

    view() {
        return (
            <div className="input-wrapper">
                <textarea
                    id="chat-input"
                    maxlength={this.messageCharLimit}
                    disabled={!app.chat.getPermissions().post || this.model.removed_at()}
                    placeholder={this.inputPlaceholder}
                    value={this.state.input.content()}
                    onkeypress={this.inputPressEnter.bind(this)}
                    oninput={this.inputProcess.bind(this)}
                    onpaste={this.inputProcess.bind(this)}
                    rows={this.state.input.rows}
                />
                {this.state.messageEditing ? (
                    <div className="icon edit" onclick={this.state.messageEditEnd.bind(this)}>
                        <i class="fas fa-times"></i>
                    </div>
                ) : null}
                <div className="icon send" onclick={this.inputPressButton.bind(this)}>
                    <i class="fas fa-angle-double-right"></i>
                </div>
                <div
                    id="chat-limitter"
                    className={this.reachedLimit() ? 'reaching-limit' : ''}
                    style={{ display: !app.chat.getPermissions().post ? 'none' : '' }}
                >
                    {this.messageCharLimit - (this.state.input.messageLength || 0) + '/' + this.messageCharLimit}
                </div>
            </div>
        );
    }

    reachedLimit() {
        this.oldReached = this.messageCharLimit - (this.state.input.messageLength || 0) < 100;
        return this.oldReached;
    }

    inputProcess(e) {
        if (e) e.redraw = false;

        let input = e.target;
        let inputValue = input.value.trim();
        this.state.input.messageLength = inputValue.length;
        this.state.input.content(inputValue);

        if (!input.lineHeight) input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
        input.rows = Math.max(Math.min(input.scrollHeight / input.lineHeight, 5), 1);

        if (this.state.input.messageLength) {
            if (!this.state.input.writingPreview && !this.state.messageEditing) this.inputPreviewStart(inputValue);
        } else {
            if (this.state.input.writingPreview && !inputValue.length) this.inputPreviewEnd();
        }

        if (this.state.messageEditing) this.state.messageEditing.content = inputValue;
        else if (this.state.input.writingPreview) this.state.input.previewModel.content = inputValue;

        if (this.attrs.oninput) this.attrs.oninput();
    }

    inputPressEnter(e) {
        e.redraw = false;
        if (e.keyCode == 13 && !e.shiftKey) {
            this.state.messageSend();
            return false;
        }
        return true;
    }

    inputPressButton() {
        this.state.messageSend();
    }

    inputPreviewStart(content) {
        if (!this.state.input.writingPreview) {
            this.state.input.writingPreview = true;

            this.state.input.previewModel = app.store.createRecord('chatmessages');
            this.state.input.previewModel.pushData({
                id: 0,
                attributes: { message: ' ', created_at: 0 },
                relationships: { user: app.session.user, chat: this.model },
            });
            Object.assign(this.state.input.previewModel, { isEditing: true, isNeedToFlash: true, content });
        } else this.state.input.previewModel.isNeedToFlash = true;

        m.redraw();
    }

    inputPreviewEnd() {
        this.state.input.writingPreview = false;

        m.redraw();
    }
}
