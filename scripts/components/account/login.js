import choozy from '../../lib/choozy';

export default window.component(node => {
  const {
    loginForm,
    recoverPasswordForm,
    toggleRecoverPasswordBtns,
    recoverMessageSent,
    recoverPasswordSuccess,
    emailList,
    redirectTo,
  } = choozy(node, null);

  if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirectPath');
    redirectTo.value = redirectPath;
  }

  const toggleRecoverPasswordPage = () => {
    loginForm.classList.toggle('hidden');
    recoverPasswordForm.classList.toggle('hidden');
  };

  toggleRecoverPasswordBtns.forEach(button => {
    button.addEventListener('click', toggleRecoverPasswordPage);
  });

  const hideError = () => {
    const errorField = document.querySelector('.errors');
    // eslint-disable-next-line prettier/prettier, no-unused-expressions
    errorField ? errorField.style.display = "none" : "";
  };

  emailList.forEach(input => {
    input.addEventListener('focus', hideError);
    input.addEventListener('keyup', hideError);
  });

  const isUrlRecoverHash = () => {
    const { hash } = window.location;
    return hash === '#recover';
  };

  if (isUrlRecoverHash() && !recoverMessageSent) toggleRecoverPasswordPage();

  if (recoverMessageSent) {
    loginForm.classList.add('hidden');
    recoverPasswordForm.classList.add('hidden');
    recoverPasswordSuccess.classList.remove('hidden');
  }
});
