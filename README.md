# BadukKids

BadukKids is an open source project to build a website. The goal of this website, is to teach very young children (age ~4 years old), the fundamental skills which are required to learn the game of go.

![image](https://user-images.githubusercontent.com/20482760/105848037-ba6cc100-5fde-11eb-88e1-58e74ec0ea2f.png)


# Use the website

An online version is deployed here: https://kids.zbaduk.com/

In the configuration settings, there are 3 possible options:

![image](https://user-images.githubusercontent.com/20482760/106210676-8ef8fa80-61c7-11eb-9e48-3433ddb24e7a.png)


1. A dropdown to modify the theme. This only changes the images.
2. When this is enabled, groups will run away but only if there's just 1 liberty left.
3. When enabled, this will start an animation to continuously show and hide the keypoints. 
4. When checked, this will show arrows to indicate where the liberties are.

# Dependencies

BadukKids is built using Angular and Typescript.
It does not have a back-end.

# For Administrators

To make a new deployment:

    ng build --prod --base-href "https://kids.zbaduk.com/"
    npx angular-cli-ghpages --dir=dist/BadukKids

Double check: if there's still a CMAKE file for domain kids.zbaduk.com.
If not, reconfigure the custom domain in the settings tab on github.

# Credits

BadukKids was founded by ZBaduk, but is licensed under an MIT license.
For additional question or remarks, you can contact bram@zbaduk.com .
