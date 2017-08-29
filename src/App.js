import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import logo from './logo.svg';
import './App.css';
import { Form } from 'formsy-react';
import PropertiesParser from './PropertiesParser';
import MyInput from './MyInput';

let prop = {
    "Description":"Settings",
    "DisplayName":"Settings",
    "Name":null,
    "Properties":
    [
        {
            "Description":"Url of API endpoint.",
            "DisplayName":"Api url",
            "Name":"ApiUrl",
            "Required":true,
            "Type":"String"
        },
        {
            "Description":"Fill the available registrations. Contact thing to get one.",
            "DisplayName":"Registrations",
            "Item":
            {
                "Description":null,
                "DisplayName":null,
                "Name":null,
                "Properties":
                [
                    {
                        "Description":"Api identifier.",
                        "DisplayName":"Identifier",
                        "Name":"Id",
                        "Required":true,
                        "Type":"String"
                    },
                    {
                        "Description":"Describe the permissions in free form",
                        "DisplayName":"Permissions",
                        "Name":"Permission",
                        "Required":false,
                        "Type":"String"
                    }
                ],
                "Type":"Object"
            },
            "Name":"Registrations",
            "Type":"Array"
        }
    ],
    "Type":"Object"
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: null,
            arrays: new Object()
        }
    }

    changeSelect(event) {
        if (event.target.value == "1") {
            this.setState({properties: prop});
        } else {
            this.setState({properties: null});
        }
    }

    addPropertiesToArray(properties) {
        let newInc = 2;
        if (this.state.arrays[properties.Name]) {
            newInc = this.state.arrays[properties.Name] + 1;
        }
        let newArrays = this.state.arrays;
        newArrays[properties.Name] = newInc;
        this.setState({arrays: newArrays});
    }

    propertiesParser(properties, prefix="") {
        if (properties) {
            if (properties.Type === "Object") {
                prefix += "obj_";
                var objectWrapper = [];
                properties.Properties.forEach((elem) => {
                    objectWrapper.push(this.propertiesParser(elem, prefix));
                })

                return (
                    <div className="row" key={prefix + Math.random()}>
                        <div className="col-md-2">
                            {properties.DisplayName} {(properties.Description) ? (<span><i className="fa fa-question-circle" aria-hidden="true" data-tip={properties.Description} data-event='click focus'></i>
                            <ReactTooltip globalEventOff='click' className="tooltip" /></span>) : ""}
                        </div>
                        <div className="col-md-10">
                            { objectWrapper }
                        </div>
                    </div>
                )
            } else if (properties.Type === "Array") {
                prefix += "arr_";
                var arrayWrapper = [];
                var buttonAdd = (<button type="button" onClick={this.addPropertiesToArray.bind(this, properties)}>Add</button>);
                if (this.state.arrays[properties.Name]) {
                    for (var i = 0; i < this.state.arrays[properties.Name]; i++) {
                        prefix += "_" + i;
                        properties.Item.Properties.forEach((elem) => {
                            arrayWrapper.push(this.propertiesParser(elem, prefix));
                        });
                    }
                } else {
                    properties.Item.Properties.forEach((elem) => {
                        arrayWrapper.push(this.propertiesParser(elem, prefix));
                    });
                }
                return (
                    <div className="row" key={prefix + Math.random()}>
                        <div className="col-md-2">
                            {properties.DisplayName} {(properties.Description) ? (<span><i className="fa fa-question-circle" aria-hidden="true" data-tip={properties.Description} data-event='click focus'></i>
                            <ReactTooltip globalEventOff='click' className="tooltip" /></span>) : ""}
                        </div>
                        <div className="col-md-10">
                            { arrayWrapper }
                            { buttonAdd }
                        </div>
                    </div>
                );
            } else if (properties.Type === "String") {
                let prefixName = prefix + properties.Name;
                return (
                    <div className="row" key={prefix + Math.random()}>
                        <div className="col-md-2">
                            {properties.DisplayName} {(properties.Description) ? (<span><i className="fa fa-question-circle" aria-hidden="true" data-tip={properties.Description} data-event='click focus'></i>
                            <ReactTooltip globalEventOff='click' className="tooltip" /></span>) : ""}
                        </div>
                        <div className="col-md-10">
                            <MyInput key={prefixName} type="text" name={prefixName} value="" required={properties.Required} />
                        </div>
                    </div>

                );
            }
        }
    }

    handleSubmit(form) {
        console.log(form);
    }

    render() {

        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <div>
                <select onChange={this.changeSelect.bind(this)}>
                    <option value="">Please, select...</option>
                    <option value="1">One</option>
                </select>
            </div>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                {this.propertiesParser(this.state.properties)}
                <button type="submit">Ok</button>
            </Form>
          </div>
        );
      }
}

export default App;
