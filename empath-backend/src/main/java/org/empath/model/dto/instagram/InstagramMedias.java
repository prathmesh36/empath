package org.empath.model.dto.instagram;

import java.util.ArrayList;

class Cursors{
    public String before;
    public String after;
}

class Paging{
    public Cursors cursors;
}

public class InstagramMedias {
    public InstagramMedias(){
        this.data = new ArrayList<>();
    }

    public ArrayList<MediaDatum> data;
    public Paging paging;
}