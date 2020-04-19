import React from 'react'
import { Result, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import SvgBackground from '../SvgBackground';



const Error_404 = () => {
    return (
        <SvgBackground>
            <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
                <Col span={24}>
                    <Result
                        // style={{horizontal}}
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}

                    />
                </Col>
            </Row>
        </SvgBackground>
    )
}

export default Error_404