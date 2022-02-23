import React from "react";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <>
            <div className="c-footer">
                <div className="c-footer-item">
                    <div className="c-footer__links">
                        <Link className="privacy__links" to="/privacy">プライバシーポリシー</Link>
                        <Link className="contact__links" to="/contact">お問い合わせ</Link>
                    </div>
                    <p className="copyright">©︎ 2021 EKIMA.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;