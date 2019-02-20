import React, {Component} from "react";
import {View, StyleSheet,TouchableOpacity, Image, Animated,Text} from 'react-native';

const buttonColor = '#ECF0F1';
const medPink = '#FF00A5';

export default class ClapsButton extends Component<Props> {
    constructor(props){
        super(props)
        this.state ={
            count: props.count ? props.count : 0,
            claps: []
        }
        this.clap = this.clap.bind(this);
        this.keepClapping = this.keepClapping.bind(this);
        this.stopClapping = this.stopClapping.bind(this);
    }
    animationComplete(countNum){
        claps = this.state.claps;
        claps.splice(claps.indexOf(countNum),1);
        this.setState({claps});
    }
    clap(){
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
    }

    keepClapping(){
        this.clapTimer = setInterval(() => this.clap(),150);
    }
    stopClapping(){
        if(this.clapTimer){
            clearInterval(this.clapTimer)
        }
    }

    renderClaps(){
        return this.state.claps.map(countNum => <ClapBubble key={countNum} count={countNum} animationComplete={this.animationComplete.bind(this)}/>)
    }
    render(){
    let clapIcon = this.state.count > 0 ? <Image source={require('../img/clapped.png')} style={{width:27,height: 27}}/> : <Image source={require('../img/clap.png')} style={{width:27,height: 27}}/>

        return(
            <View style={{flex:1}}>
                <TouchableOpacity
                    onPress={this.clap}
                    onPressIn={this.keepClapping}
                    onPressOut={this.stopClapping}
                    activeOpacity={0.7}
                    style={styles.clapButton}>
                    {clapIcon}
                </TouchableOpacity>
                {this.renderClaps()}
            </View>
        )
    }
}
class ClapBubble extends Component{
    constructor(props){
        super(props)
        this.state ={
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){

        Animated.parallel([
            Animated.timing(
                this.state.yPosition,{
                    toValue: -120,
                    duration: 500 //milliseconds
                }),
            Animated.timing(this.state.opacity,{
                toValue:1,
                duration: 500
            })
        ]).start(() => {
            setTimeout(() => {
                this.props.animationComplete(this.props.count);
            }, 500)
        });
    }

    render(){
        let animationStyle={
            transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity
        }
        return(
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+ {this.props.count}</Text>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    clapButton:{
        position: 'absolute',
        height:60,
        width: 60,
        borderRadius: 30,
        backgroundColor: buttonColor,
        bottom: 20,
        right: 20,
        elevation: 3,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1
    },
    clapBubble:{
        position: 'absolute',
        height:60,
        width: 60,
        borderRadius: 30,
        backgroundColor: medPink,
        bottom: 20,
        right: 20,
        justifyContent:'center',
        alignItems:'center',
    },
    clapText:{
        color: '#ffffff',
        fontSize: 14
    }
})
