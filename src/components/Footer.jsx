import React from 'react';

const Footer = () => {
    return (
        <div className="flex justify-center bg-base-300">
            <footer className="footer sm:footer-horizontal text-base-content p-10 max-w-6xl w-full">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        {/* Twitter */}
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 ..."></path>
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245 ..."></path>
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4 ..."></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
