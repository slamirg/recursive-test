import React from 'react'
import Formsy from 'formsy-react'

Formsy.addValidationRule('isUrlLocal', (values, value) => {
    if (value != "") {
        return /((https?:\/\/(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(value);
    }
    return true;
});

Formsy.addValidationRule('isAlphaNumericWithSpaces', (values, value) => {
    return /^[\w\d\s]+$/i.test(value);
});

Formsy.addValidationRule('isAlphanumericWithDots', (values, value) => {
    return /^[\w\d.]+$/i.test(value);
});

Formsy.addValidationRule('isAlphanumericWithSpacesAndDots', (values, value) => {
    return /^[\w\d\s.]+$/i.test(value);
});

Formsy.addValidationRule('isRole', (values, value) => {
    return /^[\w\d\s.\-_=:]+$/i.test(value);
});

Formsy.addValidationRule('isDomainName', (values, value) => {
    return /^[\w\d\-_.]+$/i.test(value);
});


const MyInput = React.createClass({

    mixins: [Formsy.Mixin],

    changeValue(event) {
        if (this.props.changeBind) {
            this.props.changeBind();
        }
        if (this.props.domainName && !this.props.noUpdate) {
            var RegEx=/\s/g;
            var tmpName = event.currentTarget.value.replace(RegEx, "").toLowerCase();
            this.props.changeDomain(tmpName);
        }
        this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    },

    render() {
        const errorMessage = this.getErrorMessage();
        let errorMsg
        if (errorMessage) {
            errorMsg = (<span className={(this.props.fright) ? "validation-error fright" : "validation-error"}>{errorMessage}</span>);
        }

        const classRequired = (this.showRequired() ? 'required' : '');
        let classAdd = "";
        if (this.props.attrclass) {
            classAdd = " " + this.props.attrclass;
        }

        if (this.props.readOnly) {
            let summaryValue = "." + this.props.domainValue;
            return(
                <div className="form-group">
                    <div className="input-group">
                        <input
                            type={this.props.type || 'text'}
                            className="form-control half-width"
                            name={this.props.name}
                            onChange={this.changeValue}
                            value={this.getValue()}
                            placeholder={this.props.placeholder}
                            required={classRequired}
                        />
                        <input type="text" className="form-control half-width" name="publisherdomain" value={summaryValue} readOnly="readonly" />
                    </div>
                    {errorMsg}
                </div>
            )
        }

        if (this.props.notFormGroup) {
            return (
                <div>
                    <input
                        type={this.props.type || "text"}
                        className={"form-control" + classAdd}
                        name={this.props.name}
                        onChange={this.changeValue}
                        value={this.getValue()}
                        placeholder={this.props.placeholder}
                        required={classRequired}
                    />
                    {errorMsg}
                </div>
            );
        }

        return (
            <div className="form-group">
                <input
                    type={this.props.type || "text"}
                    className={"form-control" + classAdd}
                    name={this.props.name}
                    onChange={this.changeValue}
                    value={this.getValue()}
                    placeholder={this.props.placeholder}
                    required={classRequired}
                />
                {errorMsg}
            </div>
        );
    }
})

export default MyInput;
