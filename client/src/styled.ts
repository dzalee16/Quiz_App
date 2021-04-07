import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./assets/JS-Bg.png";

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0;
        boreder-box: box-sizing;
    } 

    body {
        position: relative;
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),   url(${BGImage});
        background-size: cover;
        background-repeat: no-repeat; 
        background-attachment: fixed;
    }

    .app {
        display: flex;
        justify-content: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 900px;
        width: 100%;
    }

    .quiz-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        width: 100%;

        @media only screen and (max-width: 430px) {
            margin-top: 10px;
          }
        
    }

    h1 {
        font-size: 4rem;
        color: #fff;
        font-weight:800;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2), 2px 2px 2px rgba(0,0,0,0.2),
        3px 3px 3px rgba(0,0,0,0.2),
        4px 4px 4px rgba(0,0,0,0.2), 5px 5px 5px rgba(0,0,0,0.2), 
        6px 6px 6px rgba(0,0,0,0.2), 7px 7px 7px rgba(0,0,0,0.2),
        8px 8px 8px rgba(0,0,0,0.2), 
        9px 9px 9px rgba(0,0,0,0.2),
        10px 10px 10px rgba(0,0,0,0.4);
        padding: 20px;

        @media only screen and (max-width: 430px) {
            padding: 10px ;
            font-size: 2.5rem;
          }
    }
 
    p {
        font-size: 1.8rem;
        color: #fff;
        font-weight: 800;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2), 2px 2px 2px rgba(0,0,0,0.2),
        3px 3px 3px rgba(0,0,0,0.2),
        4px 4px 4px rgba(0,0,0,0.2), 5px 5px 5px rgba(0,0,0,0.2), 
        6px 6px 6px rgba(0,0,0,0.2), 7px 7px 7px rgba(0,0,0,0.2),
        8px 8px 8px rgba(0,0,0,0.2), 
        9px 9px 9px rgba(0,0,0,0.2),
        10px 10px 10px rgba(0,0,0,0.4);
        text-align: center;

        @media only screen and (max-width: 420px) {
            font-size: 1.4rem;
        }
    }

    .start-btn {
        padding: 14px;
        width: 160px;
        background: #18183d;
        color: #fff;
        font-size: 1.3rem;
        font-weight: 800;
        border-radius: 30px;
        outline: none;

        :hover {
            transform: scale(1.1);
            cursor: pointer;
        }
    }

    .difficulty {
        padding: 10px;

        & select {
            padding: 8px;
            width: 120px;
            background: #18183d;
            color: white;
            outline: none;
        }
    }

    .username {
        padding: 5px;

        & input {
            padding: 8px 20px;
            width: 250px;
            background: #18183d;
            color: white;
            border-radius: 20px;
            outline: none;
            ::placeholder {
                color: white;
            }
        }
    }

    .table-field {
        margin-top: 100px;
    }

    .score {
        font-size: 3rem;
        color: #4fb0bd;
        font-weight: 900;
        text-align: center;
        border-radius: 10px;
        background: rgba(24, 24, 61, 0.7);
        padding: 2px 20px;

        @media only screen and (max-width: 430px) {
            font-size: 2rem;
          }
    }

    .show-difficulty {
        background: rgba(24, 24, 61, 0.7);
        padding: 2px 20px;
        color: #4fb0bd;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .showUsername {
        background: rgba(24, 24, 61, 0.7);
        padding: 2px 20px;
        color: #4fb0bd;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .timer {
        font-size: 1.5rem;
        color: #4fb0bd;
        background: rgba(24, 24, 61, 0.7);
    }

    .next-btn {
        margin-top: 20px;
        padding: 10px; 
        width: 300px;
        border: none;
        background: #18183d;
        color: #fff;
        font-size: 1.3rem;
        font-weight: 800;
        border-radius: 30px;
        outline: none;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2),
    3px 3px 3px rgba(0, 0, 0, 0.2), 4px 4px 4px rgba(0, 0, 0, 0.2),
    5px 5px 5px rgba(0, 0, 0, 0.2), 6px 6px 6px rgba(0, 0, 0, 0.2),
    7px 7px 7px rgba(0, 0, 0, 0.2), 8px 8px 8px rgba(0, 0, 0, 0.2),
    9px 9px 9px rgba(0, 0, 0, 0.2), 10px 10px 10px rgba(0, 0, 0, 0.4);

        :hover {
            cursor: pointer;
        }
    }

    .loader {
        width: 80px;
        height: 60px;
        text-align: center;
        margin-top: 20px;
    }

    .loader > div {
        background: #030940;
        border: 0.5px solid gold;
        margin: 0 1px;
        width: 8px;
        height: 100%;
        display: inline-block;
        -webkit-animation: spiner 1.2s infinite ease-in-out;
        animation: spiner 1.2s infinite ease-in-out;
    }

    .loader .react2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .loader .react3 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }

    .loader .react4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .loader .react5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes spiner {
        0%,
        40%,
        100% {
            -webkit-transform: scaleY(0.4);
        },
        20% {
            -webkit-trannsform: scaleY(1);
        }
    }


    @keyframes spiner {
        0%,
        40%,
        100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1);
          -webkit-transform: scaleY(1);
        }
      }

      .endGame-btn {
          margin-top: 20px;
        padding: 10px; 
        width: 300px;
        border: none;
        background: #18183d;
        color: #fff;
        font-size: 1.3rem;
        font-weight: 800;
        border-radius: 30px;
        outline: none;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2),
    3px 3px 3px rgba(0, 0, 0, 0.2), 4px 4px 4px rgba(0, 0, 0, 0.2),
    5px 5px 5px rgba(0, 0, 0, 0.2), 6px 6px 6px rgba(0, 0, 0, 0.2),
    7px 7px 7px rgba(0, 0, 0, 0.2), 8px 8px 8px rgba(0, 0, 0, 0.2),
    9px 9px 9px rgba(0, 0, 0, 0.2), 10px 10px 10px rgba(0, 0, 0, 0.4);
      }

      :hover {
          cursor: pointer;
      }
`;

type ButtonProps = {
  userClicked: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 6px;
  width: 80px;
  margin: 0 8px;
  color: white;
  border-radius: 20px;
  outline: none;
  background: #18183d;
  transform: ${({ userClicked }) => (userClicked ? "scale(1.2)" : "scale(1)")};
  border: ${({ userClicked }) => (userClicked ? "1px solid white" : "none")};
  :hover {
    cursor: pointer;
  }
`;
