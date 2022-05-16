import React, {Component} from 'react';
import {Image} from "react-bootstrap";
class ImagePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            product: this.props.product

        }
        this.fileInput = React.createRef();
        this.changeStatus = this.changeStatus.bind(this);
    }
    changeStatus = () => {
        if (this.state.edit == true) {
            this.setState({edit: false})
        } else {
            this.setState({edit: true})
        }
    }
    render() {
        if (this.state.edit == false) {
            return (
                <div>
                    <p>Add an image</p>
                    <Image src={
                            `http://localhost:3000/images/${
                                this.state.product.image
                            }`
                        }
                        width="400px"
                        height="400px"/>

                    <button onClick={
                        this.changeStatus
                    }>Edit Image</button>

                </div>
            );
        } else {
            return (
                <div>
                    <p>Add an image</p>

                    <label htmlFor="fileUpload" className="customeFileUplad">
                        Choose File
                    </label>
                    <input class="form-control" type="file" id="fileUpload"
                        onChange={
                            this.props.handleImageChange
                        }
                        multiple
                        required/>
                    <span>(jpg, jpeg 0r png)</span>
                </div>
            );
        }
    }
}

export default ImagePreview;
