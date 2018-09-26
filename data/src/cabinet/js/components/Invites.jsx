import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '../../../common/js/components/Button';

class Invites extends Component {
  onCopy = (id) => {
    const input = document.getElementById(`promo-code-${id}`);

    if (input) {
      input.focus();
      input.select();

      try {
        setTimeout(() => {
          input.setSelectionRange(0, 9999);
        }, 1);
      } catch (e) {}

      try {
        document.execCommand('copy');
      } catch (e) {}

      try {
        navigator.clipboard.readText();
      } catch (e) {}
    }
  };

  render() {
    const { items } = this.props;
    const { onCopy } = this;

    return (
      <div className="invites">
        {
          items.map(i => (
            <div key={i.id} className="invites__item">
              <div className="invites__row">
                {
                  i.active ?
                    <div className="invites__code invites__code_active">{i.code}</div> :
                    <textarea className="invites__code invites__code_input" value={i.code} id={`promo-code-${i.id}`} onChange={() => {}} />
                }
                <div className={cs('invites__span', { invites__span_active: i.active })} />
                {
                  i.active ?
                    <div className="invites__status invites__status_active">Активирован</div> :
                    <div className="invites__status">Не активирован</div>
                }
              </div>
              {
                i.active ?
                  <div className="invites__note">{i.note}</div> :
                  <Button className="button_invites" borderless onClick={() => onCopy(i.id)}>
                    <span>Скопировать</span>
                  </Button>
              }
            </div>
          ))
        }
      </div>
    );
  }
}

Invites.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Invites;
