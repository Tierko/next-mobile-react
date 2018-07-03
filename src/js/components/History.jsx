import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grade from './Grade';
import { formatCost } from '../utils';
import { Pages } from '../constants';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.data[props.data.length - 1].id,
    };
  }

  selectMonth = ({ id }) => {
    this.setState({
      selected: id,
    });
  };

  render() {
    const { className, data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = data.find(i => i.id === selected);

    return (
      <div className={`history ${className}`}>
        <div className="history__title">Ваши <Link className="link" to={Pages.History}>расходы</Link></div>
        <div className="history__expense">- {formatCost(selectedItem.expense)} за {selectedItem.month}</div>
        <Grade data={data} onItemSelect={selectMonth} />
      </div>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

History.defaultProps = {
  className: '',
};

export default History;
