import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actions from '../state/actions';

import './Board.css';

const style = {
    cell: {
        width: 20,
        height: 20,
        margin: 0.5,
        border: '1px solid black'
    },
    row: {
        display: 'flex'
    }
}

class Board extends Component {
    componentWillReceiveProps(nextProps) {
        /* if(nextProps.pieceRequired && !this.props.pieceRequired) {
            window.setTimeout(() => this.props.newPiece(), 1000); //TODO: get current interval
        } */
        if(nextProps.pieceRequired && !this.props.pieceRequired) {
            this.props.newPiece();
        }
    }
    
    drawBoard() {
        const { position: {x,y}, board, currentPiece } = this.props;
        const displayBoard = board.map(row => row.slice(0));

        currentPiece.map((row,i) => row.map((_,j) => {
            const cell = currentPiece[i][j];

            if(cell && y+i >= 0) {
                displayBoard[y+i][x+j] = cell;
            }         
        }));

        const className = (set) => classnames({ 'cell-set': set === 1});

        return displayBoard.map((row,i) => {
            return (
                <div key={`row-${i}`} style={style.row}>
                    {
                        row.map((_,j) => <div 
                                            key={`cell-${j}`} 
                                            style={style.cell}
                                            className={className(displayBoard[i][j])}
                                        />)
                    }
                </div>                    
            )
        });
    }
    
    render() {
        return (
            <div>
                {this.drawBoard()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state };
}

export default connect(mapStateToProps,actions)(Board);