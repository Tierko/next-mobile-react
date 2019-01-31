import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { forms } from 'redux-restify';

import Services from './components/Settings';
import { createProfileForm } from './actions';
import { PROFILE_FORM_NAME } from './constants';


const stateToProps = (state, props) => ({
  profileForm: forms.selectors.profileForm.getForm(state),
  error: forms.selectors.getErrors(PROFILE_FORM_NAME)(state),
});

const dispatchToProps = dispatch => ({
  profileFormActions: bindActionCreators(forms.actions.profileForm, dispatch),
  pageSettingsActions: bindActionCreators({ createProfileForm }, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Services);
