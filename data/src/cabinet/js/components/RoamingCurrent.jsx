import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
import CheckboxSlide from './CheckboxSlide';
import { formatCost, convertStrings } from '../utils';
import { Pages, DAYS } from '../constants';

class RoamingCurrent extends Component {
  state = {
    slowInternet: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  addPackage = () => {
    const { history, data: { id } } = this.props;

    history.push(`${Pages.ROAMING}/internet/${id}`);
  };

  render() {
    const { addPackage, onChange } = this;
    const { data, data: { additionalPackage }, inRoaming } = this.props;
    const { slowInternet } = this.state;

    return (
      <Fragment>
        {
          additionalPackage &&
          <Fragment>
            <div className="roaming-current__subtitle roaming-current__subtitle_fast">
              Пакет быстрого интернет-трафика <span className="roaming-current__note roaming-current__note_desktop">(действует еще&nbsp;{additionalPackage.expired} {convertStrings(additionalPackage.expired, DAYS)})</span>
            </div>
            <div>
              <span className="roaming-current__big">
                12,01
              </span> <span className="roaming-current__note">из 20 ГБ</span> <span className="roaming-current__note roaming-current__note_mobile">(еще {additionalPackage.expired} {convertStrings(additionalPackage.expired, DAYS)})</span>
            </div>
            <ProgressLinear className="progress-linear_roaming" max={20} current={12.01} />
            <Button className="button_roaming-add" onClick={addPackage} primary={inRoaming}>
              Добавить трафик
            </Button>
          </Fragment>
        }
        {
          !additionalPackage &&
          <Button
            className="button_roaming-add button_roaming-add-empty"
            onClick={addPackage}
            primary={inRoaming}
          >
            Добавить трафик
          </Button>
        }
        <div className="roaming-current__subtitle">
          Помегабайтный трафик {
            additionalPackage && <span className="roaming-current__note">(тариф начнет действовать после израсходования пакета)</span>
          }
        </div>
        <div className="roaming-current__regular">
          <div>
            <span className="roaming-current__big">{formatCost(data.tariff.internet.byMb)}</span> <span className="roaming-current__note">/ МБ</span>
          </div>
          <CheckboxSlide className="checkbox-slide_roaming" value={slowInternet} name="slowInternet" onChange={onChange} />
        </div>
        <div className="roaming-current__tariff">
          <div className="roaming-current__tariff-item">
            <div>Звонки</div>
            <div>
              <span className="roaming-current__big">от {data.tariff.calls} ₽</span> <span>/ мин.</span>
            </div>
          </div>
          <div className="roaming-current__tariff-item">
            <div>Сообщения</div>
            <div>
              <span className="roaming-current__big">от 7 ₽</span> <span>/ СМС</span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

RoamingCurrent.propTypes = {
  history: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
  inRoaming: PropTypes.bool,
};

RoamingCurrent.defaultProps = {
  inRoaming: false,
};

export default RoamingCurrent;
