import { renderRegisterForm } from './modules/renderElements.js';
import { formPopupControl, popupControl} from './modules/controls.js';

{
  const init = () => {
    const body = document.querySelector('body');
    const { form, overlay } = renderRegisterForm(body);

    formPopupControl(form, overlay);

    body.addEventListener('click', (e) => {
      const target = e.target;
      popupControl(overlay, target);
    });
  };
  window.todo = init;
}
