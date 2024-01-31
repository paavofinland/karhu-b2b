/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import getLiquidVariables from '../../lib/get-liquid-variables';
import fetchFunction from '../../lib/fetch-function';
import {
  SELECTED_STORE_CUSTOMER,
  SELECTED_SHIPPING_ADDRESS,
  SELECTED_BILLING_ADDRESS,
} from '../core/store-select';

const querySelect = (node, queries) => queries.map(q => node.querySelector(q));

const getStoreCustomerAddresses = async (store, customerId, customerSecret) => {
  const query = new URLSearchParams({
    store,
    customerId,
    secret: customerSecret,
    storeId: localStorage.getItem(SELECTED_STORE_CUSTOMER),
  });

  return fetchFunction(`/customer/get-store-customer-addresses?${query}`);
};

const formatAddress = ({
  address1,
  address2,
  zip,
  city,
  country,
  first_name,
  last_name,
  company,
}) => {
  return `${address1 ? `${address1}, ` : ' '}${address2 ? `${address2}, ` : ' '}${
    zip ? `${zip} ` : ' '
  }${city ? `${city}, ` : ' '}${country ? `${country}, ` : ' '}${
    first_name || last_name || company
      ? `${first_name ? `${first_name} ` : ' '}${last_name ? `${last_name}, ` : ' '}${
          company ? `${company} ` : ''
        }`
      : ''
  }`;
};

const onChangeOptions = {
  bubbles: true,
  cancelable: false,
  detail: {
    shouldTriggerChange: false,
  },
};

export default window.component(node => {
  const {
    skip_payment_discount_code: discountCode,
    skip_payment_discount_applied: discountApplied,
    store: { store },
    customer: { secret: customerSecret, id: customerId, agent = false },
  } = getLiquidVariables();

  const [totalSectionElement, billingAddress] = querySelect(node, [
    '.order-summary__sections',
    '[data-different-billing-address]',
  ]);

  const updateAddressField = () => {
    const saveAddressInLocalStorage = id => {
      localStorage.setItem(
        billingAddress ? SELECTED_BILLING_ADDRESS : SELECTED_SHIPPING_ADDRESS,
        id
      );
    };

    const setupOption = address => {
      const option = document.createElement('option');
      option.value = address.id;
      option.innerText = formatAddress(address);
      option.setAttribute('data-properties', JSON.stringify(address));
      const preSavedShippingAddress = localStorage.getItem(SELECTED_SHIPPING_ADDRESS);
      const preSavedBillingAddress = localStorage.getItem(SELECTED_BILLING_ADDRESS);
      const hasShippingAddress = preSavedShippingAddress
        ? preSavedShippingAddress === address.id
        : address.default;
      const hasBillingAddress = preSavedBillingAddress
        ? preSavedBillingAddress === address.id
        : hasShippingAddress;
      const isSelectedAddress = billingAddress ? hasBillingAddress : hasShippingAddress;

      if (isSelectedAddress) {
        option.selected = true;
        saveAddressInLocalStorage(address.id);
      }
      return option;
    };

    const appendAddressSelector = (addressContainer, addressList) => {
      const fragment = document.createDocumentFragment();
      addressList.forEach(address => {
        fragment.appendChild(setupOption(address));
      });
      addressContainer.appendChild(fragment);
      addressContainer.dispatchEvent(new CustomEvent('change', onChangeOptions));
      addressContainer.firstElementChild.remove();
    };

    const [addressSelector, addressFields] = querySelect(node, [
      '[data-address-selector]',
      '[data-address-fields]',
    ]);
    if (!addressFields) return;

    // loading state
    addressFields.style.opacity = '0.5';
    addressFields.style.pointerEvents = 'none';
    Array.from(addressSelector.children).forEach(childNode => {
      if (childNode.selected) {
        childNode.innerText = 'Please wait...';
        childNode.toggleAttribute('disabled', true);
        childNode.toggleAttribute('selected', true);
      } else {
        childNode.remove();
      }
    });

    getStoreCustomerAddresses(store, customerId, customerSecret)
      .then(addressList => appendAddressSelector(addressSelector, addressList))
      .finally(() => {
        // reset loading state
        addressFields.style.opacity = '1';
        addressFields.style.pointerEvents = 'auto';
      })
      .catch(e => {
        addressSelector.firstElementChild.innerText =
          'Something went wrong, please enter your address manually.';
        addressSelector.toggleAttribute('disabled', true);
        console.error(e);
      });

    const updateAddressSelector = selectedAddress => {
      const selectedOption = Array.from(addressSelector.children).find(
        option => option.value === selectedAddress
      );
      selectedOption.selected = true;
      addressSelector.dispatchEvent(new CustomEvent('change', onChangeOptions));
    };

    addressFields.addEventListener('change', e => {
      if (e.detail && !e.detail.shouldTriggerChange) return;
      if (e.target.dataset.hasOwnProperty('addressSelector')) {
        saveAddressInLocalStorage(e.target.value);
        return;
      }
      const preSavedShippingAddress = localStorage.getItem(SELECTED_SHIPPING_ADDRESS);
      const preSavedBillingAddress = localStorage.getItem(SELECTED_BILLING_ADDRESS);
      const selectedAddress = billingAddress ? preSavedBillingAddress : preSavedShippingAddress;
      if (!selectedAddress) return;
      setTimeout(() => updateAddressSelector(selectedAddress));
    });
  };

  if (agent) {
    // get store customer addresses
    updateAddressField();

    new MutationObserver(mutationList => {
      mutationList.forEach(mutation => {
        const { type, addedNodes } = mutation;
        if (
          type !== 'childList' ||
          !addedNodes[0] ||
          !addedNodes[0].dataset?.hasOwnProperty('step')
        )
          return;

        updateAddressField();
      });
    }).observe(node, {
      childList: true,
      subtree: true,
    });
  }

  const replaceTotalWithSubtotal = () => {
    const [subtotalElement, totalElement] = querySelect(node, [
      '[data-checkout-subtotal-price-target]',
      '.total-line [data-checkout-payment-due-target]',
    ]);

    if (totalElement.innerText !== subtotalElement.innerText)
      // Check to prevent infinite loop in MutationObserver
      totalElement.innerText = subtotalElement.innerText;
  };

  replaceTotalWithSubtotal();

  new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
      const { type, addedNodes } = mutation;
      if (type !== 'childList' || !addedNodes[0]) return;

      const totalMutation =
        addedNodes[0].nodeType === Node.ELEMENT_NODE
          ? addedNodes[0].querySelector('[data-checkout-payment-due-target]')
          : 'checkoutPaymentDueTarget' in addedNodes[0].parentNode.dataset &&
            addedNodes[0].parentNode;

      if (totalMutation) replaceTotalWithSubtotal();
    });
  }).observe(totalSectionElement, {
    childList: true,
    subtree: true,
  });

  if (!discountApplied) {
    const [discountInput, discountSubmit] = querySelect(node, [
      '.order-summary__section--discount [name="checkout[reduction_code]"]',
      '.order-summary__section--discount [name="checkout[submit]"]',
    ]);
    discountInput.value = discountCode;
    discountSubmit.click();
  }
});
