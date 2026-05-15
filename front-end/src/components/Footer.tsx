import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="flex justify-between items-center px-10 py-6 border-t border-gray-200 text-gray-500 text-sm">

                <p>© 2026 HireLink. All rights reserved.</p>

                <div className="flex gap-6">
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms of Service</a>
                    <a href="/about">Contact Us</a>
                </div>

            </footer>

        </div>
    )
}

export default Footer

