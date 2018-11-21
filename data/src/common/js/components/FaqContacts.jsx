import React from 'react';

const FaqContacts = () => (
  <div className="faq-contacts">
    <div className="h1">Не нашли, ответ?</div>
    <div className="faq-contacts__items">
      <div className="faq-contacts__item">
        <img className="faq-contacts__img faq-contacts__img_mail" src="/media/images/mail.svg" alt="" />
        <div className="faq-contacts__title">Отправьте письмо</div>
        <a href="mailto:info@nextmobile.ru" className="link">info@nextmobile.ru</a>
      </div>
      <div className="faq-contacts__item">
        <img className="faq-contacts__img faq-contacts__img_phone" src="/media/images/phone.svg" alt="" />
        <div className="faq-contacts__title">Позвоните</div>
        <a href="mailto:880060066776677" className="link">8 800 600-66-77 6677</a>
      </div>
      <div className="faq-contacts__item">
        <img className="faq-contacts__img faq-contacts__img_messanger" src="/media/images/messanger.svg" alt="" />
        <div className="faq-contacts__title">Напишите</div>
        <a href="tg://resolve?domain=<USERNAME>" className="link">Телеграм</a>
        <br />
        <a href="#" className="link">Viber</a>
        <br />
        <a href="https://wa.me/00000000000" className="link">WhatsApp</a>
      </div>
      <div className="faq-contacts__item">
        <img className="faq-contacts__img faq-contacts__img_chat" src="/media/images/chat.svg" alt="" />
        <div className="faq-contacts__title">Спросите сейчас</div>
        <a href="#" className="link">Онлайн-чат</a>
      </div>
    </div>
  </div>
);

export default FaqContacts;
