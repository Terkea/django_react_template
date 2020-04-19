import React from 'react'

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

const SvgBackground = (props) => {

    return (
        <div {...props} style={styles.svgBackground} >
            {props.children}
        </div>
    )
}

export default SvgBackground;