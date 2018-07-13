import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import ProgressLinear from './ProgressLinear';
import Button from './Button';
import CheckboxSlide from './CheckboxSlide';
import { Pages } from '../constants';
import { formatCost } from '../utils';

class RoamingZone extends Component {
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
    const { slowInternet } = this.state;
    const { onChange, addPackage } = this;
    const { active, data } = this.props;

    return (
      <div className={cs('roaming-zone', { 'roaming-zone_show': data.id === active })}>
        <div className="roaming__title roaming__title_desktop">Роуминг в {data.title}</div>
        <Link to={`${Pages.ROAMING}/countries/${data.id}`} className="roaming-zone__countries">
          Австрия, Бельгия и еще 45 стран
        </Link>
        <div className="roaming-zone__subtitle roaming-zone__subtitle_fast">
          Пакет быстрого интернета <span className="roaming-zone__note_desktop">(еще 30 дней)</span>
        </div>
        <div>
          <span className="roaming-zone__big">12,01 ГБ</span> <span className="roaming-zone__note">из 20</span> <span className="roaming-zone__note roaming-zone__note_mobile">(еще 30 дней)</span>
        </div>
        <ProgressLinear className="progress-linear_roaming" max={20} current={12.01} />
        <Button className="button_roaming-add" onClick={addPackage}>
          Добавить пакет
        </Button>
        <div className="roaming-zone__subtitle">
          Помегабайтный интернет <span className="roaming-zone__note">(заработает, когда закончится пакет)</span>
        </div>
        <div className="roaming-zone__regular">
          <div>
            <span className="roaming-zone__big">{formatCost(data.tariff.internet.byMb)}</span> <span className="roaming-zone__note">/ Мб</span>
          </div>
          <CheckboxSlide className="checkbox-slide_roaming" value={slowInternet} name="slowInternet" onChange={onChange} />
        </div>
        <div className="roaming-zone__tariff">
          <div className="roaming-zone__tariff-item">
            <div>Звонки</div>
            <div>
              <span className="roaming-zone__big">от {data.tariff.calls} ₽</span> <span>/ мин</span>
            </div>
          </div>
          <div className="roaming-zone__tariff-item">
            <div>Сообщения</div>
            <div>
              <span className="roaming-zone__big">от 7 ₽</span> <span>/ СМС</span>
            </div>
          </div>
        </div>
        <Link to={`${Pages.ROAMING}/zone-tariff/${data.id}`} className="roaming-zone__more">
          Подробнее о тарифах в {data.title}
        </Link>
      </div>
    );
  }
}

RoamingZone.propTypes = {
  data: PropTypes.shape().isRequired,
  active: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default RoamingZone;
