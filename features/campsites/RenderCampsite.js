import { useRef } from 'react';
import { Text, View, StyleSheet, PanResponder, Alert, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const RenderCampsite = ({ campsite, isFavorite, markFavorite, onShowModal }) => {
    const isLeftSwipe = ({ dx }) => dx < -200;
    const isRightSwipe = ({ dx }) => dx > 200;
    const view = useRef();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then(() => {
                    console.log('Animation finished');
                })
                .catch(() => {
                    console.log('Animation interrupted');
                });
        },
        onPanResponderEnd: (e, gestureState) => {
                if(isLeftSwipe(gestureState)){
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' +
                            campsite.name +
                            ' to favorites?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => console.log('Cancel Pressed')
                            },
                            {
                                text: 'OK',
                                onPress: () =>
                                    isFavorite
                                        ? console.log('Already set as a favorite')
                                        : markFavorite()
                            }
                        ],
                        { cancelable: false }
                    );
                }else if (isRightSwipe(gestureState)){
                    onShowModal();
                }
        }
    })

    const shareCampsite = (title, message, url) => {
        Share.share(
            {
                title,
                message: `${title}: ${message} ${url}`,
                url
            },
            {
                dialogTitle: 'Share ' + title
            }
        );
    }

    if(campsite){
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={{ uri: baseUrl + campsite.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}> 
                            <Text style={styles.cardText}>
                                {campsite.name}
                            </Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => isFavorite ? console.log("Already favorited") : markFavorite()}
                        />
                        <Icon 
                            type='font-awesome'
                            name='pencil'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => onShowModal()}
                        />
                        <Icon
                            name='share'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() =>
                                shareCampsite(
                                    campsite.name,
                                    campsite.description,
                                    baseUrl + campsite.image
                                )
                            }
                        />
                    </View>
                </Card>
            </Animatable.View>
        )
    }   
    return <View />;
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCampsite;