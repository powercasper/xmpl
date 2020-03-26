export function add(a:number, b:number) {
  return a+b;
}

const fs = require( 'fs' );

const TestRunner = require( 'jest-runner' );
const { parse } = require( 'jest-docblock' );

const ARG_PREFIX = '--group=';

class GroupRunner extends TestRunner {

	static getGroups( args: any ) {
		const include: any = [];
		const exclude: any = [];

		args.forEach( ( arg: any ) => {
			if ( arg.startsWith( ARG_PREFIX ) ) {
				const group = arg.substring( ARG_PREFIX.length );
				if ( group.startsWith( '-' ) ) {
					exclude.push( group.substring( 1 ) );
				} else {
					include.push( group );
				}
			}
		} );

		return {
			include,
			exclude,
		};
	}

	// static filterTest( { include, exclude }, test ) {
	// 	let found = include.length === 0;

	// 	const parsed = parse( fs.readFileSync( test.path, 'utf8' ) );
	// 	if ( parsed.group ) {
	// 		const parsedGroup = Array.isArray( parsed.group ) ? parsed.group : [parsed.group];
	// 		for ( let i = 0, len = parsedGroup.length; i < len; i++ ) {
	// 			if ( typeof parsedGroup[i] === 'string' ) {
	// 				if ( exclude.find( ( group ) => parsedGroup[i].startsWith( group ) ) ) {
	// 					found = false;
	// 					break;
	// 				}

	// 				if ( include.find( ( group ) => parsedGroup[i].startsWith( group ) ) ) {
	// 					found = true;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return found;
	// }

	// static filterTests( args, tests ) {
	// 	const groups = GroupRunner.getGroups( args );
	// 	return groups.include.length > 0 || groups.exclude.length > 0
	// 		? tests.filter( ( test ) => GroupRunner.filterTest( groups, test ) )
	// 		: tests;
	// }

	runTests( tests: any, watcher: any, onStart: any, onResult: any, onFailure: any, options: any ) {
    console.log(onStart);
		return super.runTests(
			GroupRunner.filterTests( process.argv, tests ),
			watcher,
			onStart,
			onResult,
			onFailure,
			options,
		);
	}

}

module.exports = GroupRunner;