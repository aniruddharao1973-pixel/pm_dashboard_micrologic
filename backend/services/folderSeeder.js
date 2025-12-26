// // backend/services/folderSeeder.js
// import { DEFAULT_PROJECT_FOLDERS } from "../constants/defaultFolders.js";

// export async function seedDefaultFolders(projectId, client) {
//   console.log("🔥 SEEDER STARTED for project:", projectId);

//   for (const folder of DEFAULT_PROJECT_FOLDERS) {
//     // 1️⃣ Create root folder
//     await client.query(
//       `
//       INSERT INTO folders (
//         project_id,
//         name,
//         parent_id,
//         is_default,
//         customer_can_view,
//         customer_can_download,
//         customer_can_upload,
//         customer_can_delete
//       )
//       VALUES ($1, $2, NULL, true, $3, $4, $5, $6)
//       ON CONFLICT DO NOTHING
//       `,
//       [
//         projectId,
//         folder.name,
//         folder.customer_can_view ?? true,
//         folder.customer_can_download ?? true,
//         folder.customer_can_upload ?? false,
//         folder.customer_can_delete ?? false,
//       ]
//     );

//     // 2️⃣ Fetch root folder ID
//     const rootRes = await client.query(
//       `
//       SELECT id
//       FROM folders
//       WHERE project_id = $1
//         AND name = $2
//         AND parent_id IS NULL
//         AND deleted_at IS NULL
//       LIMIT 1
//       `,
//       [projectId, folder.name]
//     );

//     const rootFolderId = rootRes.rows[0]?.id;
//     if (!rootFolderId) continue;

//     // 3️⃣ Create subfolders
//     console.log("📦 Folder seed config:", folder);
//     if (Array.isArray(folder.subfolders)) {
//       for (const sub of folder.subfolders) {
//         await client.query(
//           `
//           INSERT INTO folders (
//             project_id,
//             name,
//             parent_id,
//             is_default,
//             customer_can_view,
//             customer_can_download,
//             customer_can_upload,
//             customer_can_delete
//           )
//           VALUES ($1, $2, $3, true, $4, $5, $6, $7)
//           ON CONFLICT DO NOTHING
//           `,
//           [
//             projectId,
//             sub.name,
//             rootFolderId,
//             sub.customer_can_view ?? true,
//             sub.customer_can_download ?? true,
//             sub.customer_can_upload ?? false,
//             sub.customer_can_delete ?? false,
//           ]
//         );
//       }
//     }
//   }

//   console.log("✅ SEEDER FINISHED");
// }

// // backend/services/folderSeeder.js
// import { DEFAULT_PROJECT_FOLDERS } from "../constants/defaultFolders.js";

// export async function seedDefaultFolders(projectId, client) {
//   console.log("🔥 SEEDER STARTED for project:", projectId);

//   for (const folder of DEFAULT_PROJECT_FOLDERS) {
//     /**
//      * 1️⃣ Create ROOT folder
//      * Seeded folders are intentionally "shared" by definition,
//      * so customer_can_see_folder is explicitly set to TRUE
//      */
//     await client.query(
//       `
//       INSERT INTO folders (
//         project_id,
//         name,
//         parent_id,
//         is_default,
//         customer_can_see_folder,
//         customer_can_view,
//         customer_can_download,
//         customer_can_upload,
//         customer_can_delete
//       )
//       VALUES ($1, $2, NULL, true, $3, $4, $5, $6, $7)
//       ON CONFLICT DO NOTHING
//       `,
//       [
//         projectId,
//         folder.name,
//         true, // customer_can_see_folder (explicit)
//         folder.customer_can_view ?? true,
//         folder.customer_can_download ?? true,
//         folder.customer_can_upload ?? false,
//         folder.customer_can_delete ?? false,
//       ]
//     );

//     /**
//      * 2️⃣ Fetch ROOT folder ID
//      */
//     const rootRes = await client.query(
//       `
//       SELECT id
//       FROM folders
//       WHERE project_id = $1
//         AND name = $2
//         AND parent_id IS NULL
//         AND deleted_at IS NULL
//       LIMIT 1
//       `,
//       [projectId, folder.name]
//     );

//     const rootFolderId = rootRes.rows[0]?.id;
//     if (!rootFolderId) continue;

//     /**
//      * 3️⃣ Create SUB-FOLDERS (if any)
//      */
//     if (Array.isArray(folder.subfolders)) {
//       for (const sub of folder.subfolders) {
//         await client.query(
//           `
//           INSERT INTO folders (
//             project_id,
//             name,
//             parent_id,
//             is_default,
//             customer_can_see_folder,
//             customer_can_view,
//             customer_can_download,
//             customer_can_upload,
//             customer_can_delete
//           )
//           VALUES ($1, $2, $3, true, $4, $5, $6, $7, $8)
//           ON CONFLICT DO NOTHING
//           `,
//           [
//             projectId,
//             sub.name,
//             rootFolderId,
//             true, // customer_can_see_folder (explicit)
//             sub.customer_can_view ?? true,
//             sub.customer_can_download ?? true,
//             sub.customer_can_upload ?? false,
//             sub.customer_can_delete ?? false,
//           ]
//         );
//       }
//     }
//   }

//   console.log("✅ SEEDER FINISHED");
// }

// backend/services/folderSeeder.js
import { DEFAULT_PROJECT_FOLDERS } from "../constants/defaultFolders.js";

export async function seedDefaultFolders(projectId, client) {
  console.log("🔥 SEEDER STARTED for project:", projectId);

  for (const folder of DEFAULT_PROJECT_FOLDERS) {
    /**
     * 1️⃣ CREATE ROOT FOLDER
     * - parent_id MUST be NULL
     * - visibility comes from config (shared / private)
     * - customer_can_see_folder = true ONLY if shared
     */
    await client.query(
      `
      INSERT INTO folders (
        project_id,
        name,
        parent_id,
        is_default,
        visibility,
        customer_can_see_folder,
        customer_can_view,
        customer_can_download,
        customer_can_upload,
        customer_can_delete
      )
      VALUES ($1, $2, NULL, true, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
      `,
      [
        projectId, // $1
        folder.name, // $2
        folder.visibility ?? "private", // $3
        folder.visibility === "shared", // $4 customer_can_see_folder
        folder.customer_can_view ?? false, // $5
        folder.customer_can_download ?? false, // $6
        folder.customer_can_upload ?? false, // $7
        folder.customer_can_delete ?? false, // $8
      ]
    );

    /**
     * 2️⃣ FETCH ROOT FOLDER ID
     */
    const rootRes = await client.query(
      `
      SELECT id, visibility
      FROM folders
      WHERE project_id = $1
        AND name = $2
        AND parent_id IS NULL
        AND deleted_at IS NULL
      LIMIT 1
      `,
      [projectId, folder.name]
    );

    const rootFolder = rootRes.rows[0];
    if (!rootFolder) continue;

    /**
     * 3️⃣ CREATE SUB-FOLDERS
     * - Subfolders inherit visibility from ROOT
     * - Subfolders only allowed if ROOT is shared
     */
    if (
      rootFolder.visibility === "shared" &&
      Array.isArray(folder.subfolders)
    ) {
      for (const sub of folder.subfolders) {
        await client.query(
          `
          INSERT INTO folders (
            project_id,
            name,
            parent_id,
            is_default,
            visibility,
            customer_can_see_folder,
            customer_can_view,
            customer_can_download,
            customer_can_upload,
            customer_can_delete
          )
          VALUES ($1, $2, $3, true, 'shared', true, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
          `,
          [
            projectId, // $1
            sub.name, // $2
            rootFolder.id, // $3
            sub.customer_can_view ?? true, // $4
            sub.customer_can_download ?? true, // $5
            sub.customer_can_upload ?? false, // $6
            sub.customer_can_delete ?? false, // $7
          ]
        );
      }
    }
  }

  console.log("✅ SEEDER FINISHED");
}
