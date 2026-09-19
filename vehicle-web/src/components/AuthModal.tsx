import React from 'react'
type propType = {
    open: boolean,
    onClose: () => void
}

function AuthModal({ open, onClose }: propType) {
    return (
        <div>AuthModalopen,onClose</div>
    )
}

export default AuthModal