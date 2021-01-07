import React, { Component } from 'react'
import { Card, Col, Row, Button} from 'antd';
// import DownloadLink from "react-download-link";
import '../App.css'
export default class Hero extends Component {
    state = {
        loading: true,
        people: []
    };

    async componentDidMount() {
        // http://sc910.sc/api/products/getitems
        const url = "https://resideo.biztechnosys.com/api/products/getitems";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ people: data, loading: false });
        console.log(data)
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }
        if (!this.state.people.length) {
            return <div>didn't get a person...</div>;
        }
        return (

            <div className="site-card-wrapper ">
                <Row gutter={16} >
                    {this.state.people.map((person, i) => (
                        
                        <Col span={8}>
                            <Card  key={i} hoverable style={{ width: 240 }} cover={<img alt="example" src={person.ProductImageUrl} />}>
                            <a href={person.ProductImageUrl} download className="btn btn-primary">Download</a>
                                <strong className="main-title">{person.ProductTitle}</strong>
                                <div className="main-dec" dangerouslySetInnerHTML={{ __html: person.ProductDescription }}></div>
                               

                                {/* <DownloadLink
   label="Promise to Save"
   filename="http://ec2-18-220-230-153.us-east-2.compute.amazonaws.com/-/media/Project/Resideo/shared/Resideo-Logo.png"
   exportFile={() => Promise.resolve("My cached data")}
 /> */}
                             
                                <a href={person.ProductLink} target="_blank" className="btn btn-primary">{person.ProductLinkText}</a> &nbsp;&nbsp;

                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>

        )
    }
}
