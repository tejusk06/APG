/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = [
  'src/coordinatorAdminClasses.js',
  'src/coordinatorAdminDashboard.js',
  'src/coordinatorAdminStudentDashboard.js',
  'src/coordinatorAdminStudentClass.js',
  'src/coordinatorAdminStudentClasses.js',
  'src/coordinatorAdminStudentForm.js',
  'src/coordinatorAdminStudentHomework.js',
  'src/coordinatorAdminStudents.js',
  'src/coordinatorAdminStudentTests.js',
  'src/coordinatorAdminStudentTopics.js',
  'src/studentClasses.js',
  'src/studentDashboard.js',
  'src/studentHomework.js',
  'src/studentTests.js',
  'src/studentTopics.js',
  'src/teacherClasses.js',
  'src/teacherIndividualClass.js',
  'src/updatePage.js',
];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
};

// Files building
if (production) {
  esbuild.build(defaultSettings);
}

// Files serving
else {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3001,
      },
      defaultSettings
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
