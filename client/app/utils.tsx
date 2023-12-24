'use client'

//
// All the helper functions
//

export const catchAsync = (fn: any) =>
  function(...args : any[]) {
    return fn(...args).catch((err: any) => {
      console.error(err);
    });
  };

export function formatDate(isoString : any) {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
export const myMax = (prev: any, current: any) => {
    return (prev.score > current.score) ? prev : current
  }

export const getButtonColor = (label: string) => {
    switch (label) {
      case 'positive':
        return 'bg-green-400 w-full content-center'; 
      case 'negative':
        return 'bg-red-400 w-full content-center';
      case 'neutral':
        return 'w-full content-center'; 
      default:
        return 'w-full content-center'; 
    }
  }

export function capFirstLetter(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export const getColor = (label: any) => {
    switch (label) {
      case 'positive':
        return 'rgb(74 222 128)'; 
      case 'negative':
        return 'rgb(248 113 113)';
      case 'neutral':
        return 'white'; 
      default:
        return 'black';
    }
  };