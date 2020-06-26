import Vue from 'vue';

export function px( num ) {
  if (typeof num === 'string')
    num = num.replaceAll( /[a-z]/i, '' );
  return num + 'px';
}

export const EventBus = new Vue();
