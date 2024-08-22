import chalk from 'chalk';

export const formatImpact = (impact:string | null | undefined):void => {

  let color = 'white';

  if(impact === 'minor') color ='cyan';
  if(impact === 'moderate') color ='yellow';
  if(impact === 'serious') color ='red';
  if(impact === 'critical') color ='bgRed';

  //@ts-ignore
  console.log(chalk.bold('Impact:') + ' ' + chalk[color](impact));
}