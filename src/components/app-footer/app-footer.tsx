import React, { memo } from 'react'

export const AppFooter = memo(() => (
    <footer className="footer">
        <p className="footer__mesto">&copy; {new Date().getFullYear()} Meets Net</p>
    </footer>
))
