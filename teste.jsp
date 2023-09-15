<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevNotes</title>
  <link rel="stylesheet" href="./css/style.css">

  <!-- bootstrap-icons -->

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

</head>
<body>

  <header>
    <h1>DevNotes</h1>
    <div id="search-container">
      <i class="bi bi-search"></i>
      <input type="text" id="search-input" placeholder="Busque por uma nota">
    </div>
  
    <button id="export-notes">
      Exportar CSV <i class="bi bi-download"></i>
    </button>
  </header>

  <div id="add-note-container">
    <input type="text" id="note-content" placeholder="O que deseja anotar?">
    <button class="add-note">
      <i class="bi bi-plus-lg"></i>
    </button>

    <% 
      for(int i = 0; i <= 5; i++) {

      }
    %>

  </div>

   <div id="notes-container">

   </div>

  <script src="./js/main.js" defer></script>
  
</body>
</html>