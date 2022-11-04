import styled from 'styled-components';

export const StyledContainer = styled('div') <any>`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;
  border-top: ${(p) => (p.border ? '1px solid #CDD1D4' : '')};
  @media only screen and (max-width: 1024px) {
    max-width: calc(100% - 68px);
    padding: 0 30px;
  }

  @media only screen and (max-width: 768px) {
    max-width: calc(100% - 38px);
    padding: 0 18px;
  }

  @media only screen and (max-width: 414px) {
    max-width: 100%;
    padding: 0 18px;
  }
`;

export const Root = styled('div')`
  position: relative;
  z-index: 99;
  .cloud-content {
    bottom: 0;
    left: 0;
    padding-top: 50px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -1;
  }

  /* Responsive media query */
  @media screen and (max-width: 767px) {
    .sun {
      width: 140px;
      height: 140px;
    }
    .sunlight-box span {
      height: 140px;
      width: 140px;
    }
    .cloud {
      width: 150px;
      height: 260px;
    }
    // .cloud:before {
    //   width: 120px;
    //   height: 120px;
    //   top: -80px;
    //   right: 50px;
    // }
    .eyes-block {
      width: 70px;
    }
    .eyes {
      width: 18px;
      height: 18px;
    }
    .eyes:before {
      height: 5px;
      width: 5px;
    }
    .mouth {
      width: 15px;
      height: 15px;
    }
    .tongue {
      bottom: -8px;
    }
    /* KEYFRAMES */

    @keyframes scale-mouth {
      0% {
        height: 15px;
      }

      100% {
        height: 22px;
      }
    }

    @-webkit-keyframes scale-mouth {
      0% {
        height: 15px;
      }

      100% {
        height: 22px;
      }
    }

    @keyframes scale-tongue {
      0% {
        height: 14px;
      }

      100% {
        height: 20px;
      }
    }

    @-webkit-keyframes scale-tongue {
      0% {
        height: 14px;
      }

      100% {
        height: 20px;
      }
    }

    .cloud-1 {
      animation: animate-1 32s linear infinite;
      -webkit-animation: animate-1 43s linear infinite;
      transform: scale(0.45);
      -webkit-transform: scale(0.45);
    }

    .cloud-2 {
      animation: animate-2 37s linear infinite;
      -webkit-animation: animate-2 47s linear infinite;
      transform: scale(0.25);
      -webkit-transform: scale(0.25);
    }

    .cloud-3 {
      animation: animate-3 45s linear infinite;
      -webkit-animation: animate-3 45s linear infinite;
      transform: scale(0.3);
      -webkit-transform: scale(0.3);
    }

    .cloud-4 {
      animation: animate-4 50s linear infinite;
      -webkit-animation: animate-4 60s linear infinite;
      transform: scale(0.6);
      -webkit-transform: scale(0.6);
    }

    .cloud-5 {
      animation: animate-5 55s linear infinite;
      -webkit-animation: animate-5 65s linear infinite;
      transform: scale(0.45);
      -webkit-transform: scale(0.45);
    }

    .cloud-6 {
      animation: animate-6 60s linear infinite;
      -webkit-animation: animate-6 70s linear infinite;
      transform: scale(0.55);
      -webkit-transform: scale(0.55);
    }

    .cloud-7 {
      animation: animate-7 65s linear infinite;
      -webkit-animation: animate-7 75s linear infinite;
      transform: scale(0.3);
      -webkit-transform: scale(0.3);
    }

    .marquee {
      -webkit-animation-duration: 30s;
      animation-duration: 30s;
    }
  }

  // .wallet-adapter-modal-wrapper {
  //   background: #ffffff;
  // }

  // .wallet-adapter-button {
  //   background-color: #000000;
  // }

  // .wallet-adapter-modal-list {
  //   margin: 0 0 4px !important;
  // }
  // .wallet-adapter-modal-list li:not(:first-of-type) {
  //   margin-top: 4px !important;
  // }

  // .wallet-adapter-modal-title {
  //   color: #000000;
  }
`;

export const Hero = styled('div')`
  text-align: center;
  margin: 80px 0 80px;
`;
export const MintCount = styled('h3')`
  font-size: 24px;
  line-height: 1;
  margin-bottom: 20px;
  margin-top: 25px;
  font-weight: 700;
`;
export const Heading = styled('h1')`
  font-family: nabana;
  letter-spacing: 2px;
  margin-bottom: -20px;
  color: #897ea5;
  font-size: 60px;
`;
export const MintButtonStyled = styled('button')`
  border: 0.1px solid #424242;
  background: #000000b0;
  border-radius: 10px;
  padding: 6px;
  font-size: 28px;
  min-width: 300px;
  box-shadow: 2px 3px 1px 0px #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :hover {
    background: #000;
    color: #fff;
  }
`;
export const NftWrapper = styled('div')`
  position: relative;
  z-index: 99;
  .marquee-wrapper {
    overflow: hidden;
    transform: skew(360deg, 356deg);
  }

  .marquee {
    display: flex;
    animation-name: marquee;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    transform: translateX(0);
    img {
      padding: 5px;
      max-width: 200px;
      border-radius: 10px;
    }
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;
export const NftWrapper2 = styled('div')`
  position: relative;
  z-index: 99;
  .marquee-wrapper {
    overflow: hidden;
    transform: skew(360deg, 356deg);
  }

  .marquee {
    display: flex;
    animation-name: marquee2;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    transform: translateX(0);

    img {
      padding: 5px;
      max-width: 200px;
      border-radius: 10px;
    }
  }

  @keyframes marquee2 {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
