const arg1 = process.argv[2];
const arg2 = process.argv[3];

import obj from './modules_default_export_math';

console.log(obj.PI);
console.log(obj.sqrt(+arg1));
console.log(obj.square(+arg2));