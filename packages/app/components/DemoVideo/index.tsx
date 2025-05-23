import { View, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import type { VideoSource } from 'expo-video';
import { useEvent } from 'expo';
import { useTheme } from 'tamagui';
import React, { useState } from 'react';

const assetId = require('../../assets/exo-onboarding-optimized.mp4');

const videoSource: VideoSource = {
  assetId,
  metadata: {
    title: 'Onboarding Demo',
    artist: 'Your App',
  },
};

export default function DemoVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  if (!isVisible) return null;

  return (
    <View style={{ flex: 1 }}>
      <VideoView
        style={{
          // flex: 1,
          // borderRadius: 12,
          width: Dimensions.get('window').width - 32,
          height: Dimensions.get('window').height - 125,
          backgroundColor: '#000',
        }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      {/* <View style={{ flexDirection: 'row', marginTop: 16, position: 'absolute', bottom: 32, left: 0, right: 0, justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ marginRight: 16, padding: 10, backgroundColor: theme.color?.val, borderRadius: 8 }}
          onPress={() => {
            if (isPlaying) player.pause();
            else player.play();
          }}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} color={'#fff'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 8 }}
          onPress={() => {
            setIsVisible(false);
            player.pause();
          }}
        >
          <Ionicons name='close' color={'#222'} size={24} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}