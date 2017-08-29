import React, { Component } from 'react';
import MyInput from './MyInput';

export default class PropertiesParser extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let propers = this.props.properties;
        switch (propers.Type) {
            case "String":
                return (
                    <div className="row">
                        <div className="col-md-2">
                            {propers.DisplayName}
                        </div>
                        <div className="col-md-10">
                            <MyInput
                                type="text"
                                name={propers.Name}
                                required={propers.Required}
                                value="" />
                        </div>
                    </div>
                );
                break;
        }
    return null;
    }
}
