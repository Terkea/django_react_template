import React from 'react'
import { Result, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const styles = {
    svgBackground: {
        backgroundImage: "url(" + 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto'
    }
}

const Error_404 = () => {
    return (
        <div style={styles.svgBackground}>
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
        </div>
    )
}

export default Error_404