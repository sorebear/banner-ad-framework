module.exports = (gulp, banners) => {
  gulp.task('rename', () => {
    const currentNameIndex = process.argv.indexOf('--currentName') + 1;
    const currentName = currentNameIndex ? process.argv[currentNameIndex] : null;
    const newNameIndex = process.argv.indexOf('--newName') + 1;
    const newName = newNameIndex ? process.argv[newNameIndex] : null;
    
    if (!currentName || !newName) {
      console.log('PLEASE INPUT A VALID CURRENT NAME AND NEW NAME. THE COMMAND FORMAT SHOULD READ: "gulp rename --currentName <current-name> --newName <newName>"');
      return;
    }

    if (!banners.banners[currentName]) {
      console.log('NO BANNER WAS FOUND WITH THE CURRENT BANNER NAME');
      return;
    } 
    
    console.log(currentName, newName);
  });
}