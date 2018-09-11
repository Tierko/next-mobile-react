import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import Pagination from './Pagination';
import { formatPhone, formatCost } from '../utils';

class Numbers extends Component {
  state = {
    page: 1,
    phonesPerPage: 8,
  };

  componentDidMount() {
    const { onResize } = this;
    onResize();

    window.addEventListener('resize', onResize);
  }

  componentWillUnmount() {
    const { onResize } = this;

    window.removeEventListener('resize', onResize);
  }

  onResize = () => {
    const { phonesPerPage } = this.state;
    const width = document.documentElement.clientWidth;

    if (width > 950 && phonesPerPage !== 33) {
      this.setState({
        phonesPerPage: 33,
      });
    } else if (width <= 950 && width > 650 && phonesPerPage !== 20) {
      this.setState({
        phonesPerPage: 20,
      });
    } else if (width <= 650 && phonesPerPage !== 8) {
      this.setState({
        phonesPerPage: 8,
      });
    }
  };

  setPage = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    const { setPage } = this;
    const { numbers, selectedPhone, selectPhone } = this.props;
    const { phonesPerPage } = this.state;
    const pages = Math.ceil(numbers.length / phonesPerPage) || 1;
    const page = this.state.page > pages ? pages : this.state.page;
    const start = phonesPerPage * (page - 1);
    const end = phonesPerPage * (page - 1) + phonesPerPage;

    return (
      <div className="numbers">
        <div className="numbers__inner">
          {
            numbers.slice(start, end).map(n => (
              <div key={n.phone} className="numbers__item">
                <Radio
                  name={selectedPhone}
                  value={n.phone}
                  selected={selectedPhone}
                  onChange={selectPhone}
                  className="radio_numbers"
                >
                  <div className="numbers__item-inner">
                    <div className="numbers__item-phone">{formatPhone(n.phone)}</div>
                    <div className="numbers__item-price">{formatCost(n.price, true)}</div>
                  </div>
                </Radio>
              </div>
            ))
          }
        </div>
        <Pagination currentPage={page} pages={pages} setPage={setPage} />
      </div>
    );
  }
}

Numbers.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedPhone: PropTypes.string.isRequired,
  selectPhone: PropTypes.func.isRequired,
};

export default Numbers;
