import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import ProgressLinear from './ProgressLinear';
import Button from './Button';
import CheckboxSlide from './CheckboxSlide';
import { Pages, COUNTRIES } from '../constants';
import { formatCost, convertStrings } from '../utils';

class RoamingZone extends Component {
  state = {
    slowInternet: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  getCountries = () => {
    // const filtered = [];
    const { data, features, zones } = this.props;
    let countries = features.filter(f => data.countries.indexOf(f.properties.iso_a2) !== -1);

    // if (countries.length === 0) {
    //   zones.forEach((z) => {
    //     if (z.id === data.id) {
    //       return false;
    //     }
    //
    //     z.countries.forEach(c => filtered.push(c));
    //   });
    // }
    //
    // if (filtered.length) {
    //   countries = features.filter(f => data.countries.indexOf(f.properties.iso_a2) === -1);
    // }

    countries = countries.map(c => c.properties.name);

    if (countries.length > 2) {
      const count = countries.length - 2;
      return [countries[0], countries[1], `и еще ${count} ${convertStrings(count, COUNTRIES)}`].join(', ');
    }

    return countries.join(', ');
  };

  addPackage = () => {
    const { history, data: { id } } = this.props;

    history.push(`${Pages.ROAMING}/internet/${id}`);
  };

  render() {
    const { slowInternet } = this.state;
    const { onChange, addPackage, getCountries } = this;
    const { active, data } = this.props;


    return (
      <div className={cs('roaming-zone', { 'roaming-zone_show': data.id === active })}>
        <div className="roaming__title roaming__title_desktop">Роуминг в {data.title}</div>
        <Link to={`${Pages.ROAMING}/countries/${data.id}`} className="roaming-zone__countries">
          {getCountries()}
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
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RoamingZone;
