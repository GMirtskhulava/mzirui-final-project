// Components
import { RouterPath } from '../components/index.js';

function ContactPage() {
    return (
        <>
            <RouterPath />
            <div className="contactPage-container">
                <div className="contact-box">
                    <div className="contact-box__info">
                        <h2 className="contact-box__info__title">Contact Info:</h2>
                        <p className="contact-box__info__desc">
                            Fill the form amd our teaam will get to back to you within 24 hours.
                        </p>
                        <ul className="contact-box__info__list">
                            <li className="contact-box__info__list__item">
                                <i className="fa-solid fa-phone"></i>
                                <p>+995 555 555 555</p>
                            </li>
                            <li className="contact-box__info__list__item">
                                <i className="fa-solid fa-envelope"></i>
                                <p>info@pronia.com</p>
                            </li>
                            <li className="contact-box__info__list__item">
                                <i className="fa-solid fa-location"></i>
                                <p>Georgia, Tbilisi</p>
                            </li>
                        </ul>
                    </div>
                    <form className="contact-box__form">
                        <div className="group-input">
                            <input
                                type="text"
                                placeholder="First Name*"
                            ></input>
                            <input
                                type="text"
                                placeholder="Last Name*"
                            ></input>
                        </div>
                        <div className="group-input">
                            <input
                                type="text"
                                placeholder="Phone Name*"
                            ></input>
                            <input
                                type="text"
                                placeholder="Email*"
                            ></input>
                        </div>
                        <div className="input-row">
                            <textarea placeholder="Message"></textarea>
                        </div>
                        <div className="button-row">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="contactPage-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.7401990608037!2d44.74351377647806!3d41.72612467491501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d29689782c1%3A0xf041e8983baa43fa!2z4YOh4YOQ4YOY4YOc4YOk4YOd4YOg4YOb4YOQ4YOq4YOY4YOdIOGDouGDlOGDpeGDnOGDneGDmuGDneGDkuGDmOGDlOGDkeGDmOGDoSDhg6rhg5Thg5zhg6Lhg6Dhg5ggIuGDm-GDluGDmOGDo-GDoOGDmCIgSVQgQ2VudGVyIE1aSVVSSQ!5e0!3m2!1sen!2sge!4v1744297335732!5m2!1sen!2sge"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}

export default ContactPage;
